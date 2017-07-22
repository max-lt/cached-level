/**
 * @param val
 * @private
 */
const _resolve = (val) => Promise.resolve(val);

/**
 * @template ERR, RES
 * @param {*} namespace
 * @param {string} [method]
 * @returns {function().<Promise<RES, ERR>>}
 * @private
 */
function _to_promise(namespace, method) {
    const meth = method ? namespace[method] : namespace;
    const bind = method ? namespace : null;
    return function (...args) {
        return new Promise((resolve, reject) => {
            meth.apply(bind, [].concat(args, (err, res) => {
                (err) ? reject(err) : resolve(res)
            }))
        })
    }
}

module.exports._to_promise = _to_promise;
module.exports._resolve = _resolve;
