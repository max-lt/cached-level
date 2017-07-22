const redis = require('redis');
const _to_promise = require('./transform/promisify')._to_promise;
const _resolve = (val) => Promise.resolve(val);

/**
 * @extends RevelInterface
 * @constructor
 */
function Redis() {

    this.db = redis.createClient.apply(redis, arguments);

    const _set = _to_promise(this.db, 'set');
    const _get = _to_promise(this.db, 'get');
    const _mset = _to_promise(this.db, 'mset');
    const _mget = _to_promise(this.db, 'mget');

    this.set = _set;

    this.get = _get;

    this.mset = _mset;

    this.mget = _mget;

    this.quit = () => _resolve(this.db.quit() && 'OK');

}

module.exports = Redis;
