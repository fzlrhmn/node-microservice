/**
 * Created by fzlrhmn on 11/28/16.
 */
let supertest   = require('supertest');
let chai        = require('chai');
let assert      = chai.assert;
let expect      = chai.expect;
let should      = chai.should();

let server = supertest.agent("http://localhost:5000");

describe("Sample unit testing for report collection", function() {
    this.timeout(100000);

   it("Should post data", function(done) {
        let data = {
            title : "Input dari unit testing",
            description : "Hello unit testing",
            latitude : -6.1,
            longitude : 106.12
        };

       server
           .post("/api/report")
           .send(data)
           .expect(200)
           .end(function(error, result) {
               if (error) {done(error)}
               else {done();}
           })
   });

    it("should return array of object", function(done) {
        server
            .get("/api/report")
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(error, result) {
                if (error) done(error);
                should.not.exist(error);
                let response = result.body;

                response.should.be.an('object');
                expect(response).to.have.property('data');
                expect(response).to.have.property('count');

                expect(response.data).to.have.length.of.at.least(5);

                response.data.forEach(item => {
                    item.id.should.to.be.a('string');
                    assert.isNumber(item.latitude);
                    assert.isNumber(item.longitude);
                    assert.isArray(item.status);
                });

                done();
            })
    });

    it("should return array of object", function(done) {
        server
            .get("/api/report/58394a4f2d2d8802086ee989")
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(error, result) {
                if (error) done(error);
                should.not.exist(error);
                let response = result.body;

                response.should.be.an('object');
                expect(response).to.have.property('title');
                expect(response).to.have.property('description');
                expect(response).to.have.property('latitude');
                expect(response).to.have.property('longitude');
                expect(response).to.have.property('timestamp');

                assert.isString(response.title);
                assert.isString(response.description);
                assert.isNumber(response.latitude);
                assert.isNumber(response.longitude);

                done();
            })
    });
});