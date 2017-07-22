const expect = require('expect');

const SET_RESPONSE_OK = 'OK';

module.exports = function (name, revel) {

    const _str = (str) => {
        if (str === null) return 'null (null)';
        if (str === true) return 'true (boolean)';
        if (str === false) return 'false (boolean)';
        if (str === undefined) return 'undefined (undefined)';
        if (typeof str === 'number') return str + ' (number)';
        return str + ' (string)';
    };

    const _arr = (arr) => Array.isArray(arr) && '[' + arr.map(_str).join(', ') + ']';

    const _cmp = (a, b) => Array.isArray(a) && Array.isArray(b) && a.every((e, i) => e === b[i]);

    function typed(key1, value1, key2, value2, key3, value3) {
        const keyType = typeof key1;
        const valType = typeof value1;

        describe(`Mset/mget with ${_arr([key1, value1, key2, value2, key3, value3])} values`, function () {

            const mset1 = [key1, value1, key2, value2, key3, value3];
            it(`mset should return ${SET_RESPONSE_OK}`, (done) => {
                revel.mset(mset1)
                    .then((res) => {
                        expect(res).toBe(SET_RESPONSE_OK, `${res} should be ${SET_RESPONSE_OK}`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            });

            const mget2 = [key1, key3];
            const mgot2 = ['' + value1, '' + value3];
            it(`should be able to get previously set value (as string) with original key (as ${keyType})`, (done) => {
                revel.mget(mget2)
                    .then((res) => {
                        expect(_cmp(res, mgot2)).toBe(true, `${_arr(res)} (${typeof res}) should be ${_arr(mgot2)}`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            });

            const mget3 = [key3, 'unknown'];
            const mgot3 = ['' + value3, null];
            it(`mget ${_arr(mget3)} value should return ${_arr(mgot3)}`, (done) => {
                revel.mget(mget3)
                    .then((res) => {
                        expect(_cmp(res, mgot3)).toBe(true, `${_arr(res)} (${typeof res}) should be ${_arr(mgot3)}`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            });

            const mget4 = ['' + key1, '' + key3];
            const mgot4 = ['' + value1, '' + value3];
            it(`should be able to get previously set value (as string) with string casted key (from ${keyType})`, (done) => {
                revel.mget(mget4)
                    .then((res) => {
                        expect(_cmp(res, mgot4)).toBe(true, `${_arr(res)} (${typeof res}) should be ${_arr(mgot4)} string (from ${valType})`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            })

        });

    }

    describe(name + ':', () => {

        typed('ke1', 123, 'ke2', 'hello', 'ke3', 1);

    });

};