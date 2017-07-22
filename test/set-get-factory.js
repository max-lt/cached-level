const expect = require('expect');

const SET_RESPONSE_OK = 'OK';

module.exports = function (name, revel) {

    function typed(key, value) {
        const keyType = typeof key;
        const valType = typeof value;

        describe(`Set/get with ${keyType} key "${key}" / ${valType} value "${value}"`, function () {

            it(`set should return ${SET_RESPONSE_OK}`, (done) => {
                revel.set(key, value)
                    .then((res) => {
                        expect(res).toBe(SET_RESPONSE_OK, `${res} should be ${SET_RESPONSE_OK}`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            });

            it(`should be able to get previously set value (as string) with original key (as ${keyType})`, (done) => {
                revel.get(key)
                    .then((res) => {
                        expect(res).toBe('' + value, `${res} (${typeof res}) should be ${'' + value} string (from ${valType})`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            });

            it(`get unknown value should return null`, (done) => {
                revel.get('unknown')
                    .then((res) => {
                        expect(res).toBe(null, `${res} (${typeof res}) should be null`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            });

            it(`should be able to get previously set value (as string) with string casted key (from ${keyType})`, (done) => {
                revel.get('' + key)
                    .then((res) => {
                        expect(res).toBe('' + value, `${res} (${typeof res}) should be ${'' + value} string (from ${valType})`);
                    })
                    .catch((e) => e)
                    .then((e) => done(e))
            })

        });

    }

    describe(name + ':', () => {

        typed('kee', 123);
        typed(123, 456);
        typed(123, 0);
        typed(123, 'val');
        // typed(123, {a:1, b:1});

    });

};