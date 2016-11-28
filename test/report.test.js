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
   })
});