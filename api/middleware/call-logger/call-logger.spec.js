'use strict';

var should = require('should'),
	rewire = require("rewire"),
	testing = rewire('./call-logger');

describe('middleware call-logger', function () {
    
    it('should call next', function (done) {
        testing({}, {}, function(){
            //If this runs then next has been called
            ('String').should.equal('String');
            done();
        });
    });

});