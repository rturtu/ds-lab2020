var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("Route tests", () => {
    it("should get error 404", done => {
        chai.request(app)
        .get("/inexistent-route")
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
    });
})