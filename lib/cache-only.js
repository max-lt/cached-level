const LRU = require("lru-cache");

const noop = _ => _;

const _resolve = (val) => Promise.resolve(val);

/**
 * @extends RevelInterface
 * @param {{}} [opts]
 * @constructor
 */
function CacheOnly(opts) {

    /**
     * @type {LRU.Cache}
     */
    const cache = LRU(opts);

    const _cache_set = (key, value) => cache.set('' + key, '' + value);
    const _cache_get = (key) => cache.get('' + key);
    const _cache_del = (key) => cache.del('' + key);

    this.total = 0;
    this.fromCache = 0;

    this.set = (key, value) => _resolve(_cache_set(key, value) && 'OK');

    this.get = (key) => {
        const val = _cache_get(key);
        this.total++;
        return _resolve(noop(val === undefined ? null : val, val && this.fromCache++));
    };

    this.mset = (kvs) => {
        for (let i = 0; kvs[i];) _cache_set(kvs[i++], kvs[i++]);
        return _resolve('OK');
    };

    this.mget = (keyArray) => Promise.all(keyArray.map(this.get));

    this.del = (key) => Array.isArray(key) ? key.forEach(_cache_del) : _cache_del(key);

    this.quit = () => _resolve('OK');

}

module.exports = CacheOnly;
