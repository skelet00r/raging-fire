var should = require('should'),
	rewire = require("rewire"),
	testing = rewire('./error');

describe('middleware error', function () {
    
    it('should respond with 404', function (done) {
        var res = {
            status : function(a){
                a.should.equal(404);
            },
            json : function(a){
                (a.code).should.equal(404);
                (a.error).should.equal(true);
                (a.message).should.equal('Resource could not be found');
                done();
            }
        }
        testing({}, res, {});
    });

});