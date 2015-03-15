var should = require('should'),
    rewire = require("rewire"),
    testing = rewire('./response');

var res = {};

describe('response end', function () {
    
    beforeEach(function () {
        res = {
            statusValue: {},
            endValue: {},
            status: function (number) {
                this.statusValue = number;
            },
            end: function (string) {
                this.endValue = string;
            }
        };
    });

    it('should throw error: response object required', function (done) {
        testing.end.bind(null).should.throw('Response object missing and required');
        done();
    });

    it('should respond with status : 200', function (done) {
        testing.end(res, "Hi there");
        (res.statusValue).should.equal(200);
        done();
    });

    it('should respond with status : 200', function (done) {
        testing.end(res, 200, "Message");
        (res.statusValue).should.equal(200);
        done();
    });

    it('should respond with message : Server Error', function (done) {
        testing.end(res, 200);
        var obj = JSON.parse(res.endValue);
        (obj.message).should.equal('Server Error');
        done();
    });

    it('should respond with status : 500', function (done) {
        testing.end(res, 200);
        (res.statusValue).should.equal(500);
        done();
    });

    it('should respond with error : true', function (done) {
        testing.end(res, 200);
        var obj = JSON.parse(res.endValue);
        (obj.error).should.equal(true);
        done();
    });

    it('should respond with status : 500', function (done) {
        testing.end(res, 401);
        (res.statusValue).should.equal(401);
        done();
    });

    it('should respond with error : true', function (done) {
        testing.end(res, 401);
        var obj = JSON.parse(res.endValue);
        (obj.error).should.equal(true);
        done();
    });

    it('should respond with status : 404', function (done) {
        testing.end(res, 404, "Where is it!");
        (res.statusValue).should.equal(404);
        done();
    });

    it('should respond with message : Where is it!', function (done) {
        testing.end(res, 404, "Where is it!");
        var obj = JSON.parse(res.endValue);
        (obj.message).should.equal("Where is it!");
        done();
    });

    it('should respond with message : Page not found', function (done) {
        testing.end(res, 404);
        var obj = JSON.parse(res.endValue);
        (obj.message).should.equal("Page not found");
        done();
    });
    
    it('should respond with message : Unathorized access', function (done) {
        testing.end(res, 401);
        var obj = JSON.parse(res.endValue);
        (obj.message).should.equal("Unathorized access");
        done();
    });
    
    it('should respond with message : Forbidden', function (done) {
        testing.end(res, 403);
        var obj = JSON.parse(res.endValue);
        (obj.message).should.equal("Forbidden");
        done();
    });  

    it('should respond with message : Missing parameters', function (done) {
        testing.end(res, 400);
        var obj = JSON.parse(res.endValue);
        (obj.message).should.equal("Missing parameters");
        done();
    });
    
    it('should respond with message : Server Error', function (done) {
        testing.end(res, 500);
        var obj = JSON.parse(res.endValue);
        (obj.message).should.equal("Server Error");
        done();
    });

    it('should respond with error : false', function (done) {
        testing.end(res, 200, "Hi there");
        var obj = JSON.parse(res.endValue);
        (obj.error).should.equal(false);
        done();
    });

    it('should respond with error : true', function (done) {
        testing.end(res, 404);
        var obj = JSON.parse(res.endValue);
        (obj.error).should.equal(true);
        done();
    });



});