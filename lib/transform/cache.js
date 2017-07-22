const LRU = require("lru-cache");

const _resolve = (val) => Promise.resolve(val);

/**
 * @extends RevelInterface
 * @param {RevelInterface} db
 * @param {LRU.Cache} cache
 * @constructor
 */
function Cache(db, cache) {

    this.total = 0;
    this.fromDB = 0;
    this.fromCache = 0;

    this.db = db;
    this.cache = cache;

    const _cache_set = (key, value) => cache.set('' + key, '' + value);
    const _cache_get = (key) => cache.get('' + key);

    this.set = (key, value) => (_cache_set(key, value), this.db.set(key, value));

    this.get = (key) => {
        ++this.total;
        const val = _cache_get(key);
        if (val !== undefined) {
            ++this.fromCache;
            return _resolve(val);
        } else {
            return this.db.get(key).then((val) => (val && _cache_set(key, val, ++this.fromDB), val));
        }
    };

    this.mset = (kvs) => {
        for (let i = 0; kvs[i];) _cache_set(kvs[i++], kvs[i++]);
        return this.db.mset(kvs);
    };

    this.mget = (keyArray) => Promise.all(keyArray.map(this.get));

    this.quit = this.db.quit;

    this.on = this.db.on;

}

/**
 * @param DB
 * @return {function(dbName:String, cacheOptions:LRU.Options, dbOptions:LevelUp.levelupOptions|*):Cache}
 */
function cacheFactory(DB) {
    return function (dbName, cacheOptions, dbOptions) {
        const db = dbName ? new DB(dbName, dbOptions) : new DB(dbOptions);
        const cache = new LRU(cacheOptions);
        return new Cache(db, cache)
    }
}

module.exports = Cache;
module.exports.factory = cacheFactory;
