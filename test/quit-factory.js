const expect = require('expect');

const QUIT_RESPONSE_OK = 'OK';

module.exports = function (name, revel) {

    describe(name + ':', () => {

        it(`quit should return  ${QUIT_RESPONSE_OK}`, (done) => {
            revel.quit()
                .then((res) => {
                    expect(res).toBe(QUIT_RESPONSE_OK, `${res} should be ${QUIT_RESPONSE_OK}`);
                })
                .catch((e) => e)
                .then((e) => done(e))
        });

    });

};