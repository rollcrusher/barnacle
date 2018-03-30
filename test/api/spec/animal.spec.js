const opts = require('../../../options');
const request = require('request');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const chaiMatchPattern = require('chai-match-pattern');
chai.use(chaiMatchPattern);
let _ = chaiMatchPattern.getLodashModule();

describe("animal api tests", () => {
    it("should return an animal object by id", done => {
        request.get(opts.URL_HOST + 'api/animals/5abd03c5dfbd3a094d68d57c', (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            chai.expect(JSON.parse(body)[0]).to.matchPattern({"_id":"5abd03c5dfbd3a094d68d57c","name":"dog", "img": _.isUrl});
            done();
        });
    });
});
