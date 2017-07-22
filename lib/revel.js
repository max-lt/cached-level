const EventEmitter = require('events').EventEmitter;

/**
 * @type {function(dbName: string, options: ?levelupOptions): LevelUp}
 */
const level = require('level');
const _to_promise = require('./transform/promisify')._to_promise;

/**
 * @extends RevelInterface
 * @param {string} dbName
 * @param {levelupOptions} [options]
 * @constructor
 */
function Revel(dbName, options) {

    this.db = level(dbName, options);

    const self = this;

    const _get = _to_promise(this.db, 'get');
    const _set = _to_promise(this.db, 'put');
    const _batch = _to_promise(this.db, 'batch');
    const _close = _to_promise(this.db, 'close');

    const _emitError = (err) => self.emit('error', err);

    this.set = (key, value) => _set(key, value).then(_ => 'OK', _emitError);

    this.get = (key) => _get(key).catch((e) => null);

    this.mset = (kvs) => {
        const ops = [];

        for (let i = 0; kvs[i];) ops.push({type: 'put', key: kvs[i++], value: kvs[i++]})

        return _batch(ops).then(() => 'OK', _emitError)
    };

    this.mget = (keyArray) => Promise.all(keyArray.map(this.get));

    this.quit = () => _close().then((status) => status || 'OK');

}

Revel.prototype.__proto__ = EventEmitter.prototype;

module.exports = Revel;
