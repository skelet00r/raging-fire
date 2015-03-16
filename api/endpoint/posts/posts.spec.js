'use strict';

var should = require('should'),
	rewire = require("rewire"),
	testing = rewire('./posts.controller');

describe('byViewsPopularity', function () {

	it('should respond with status 400 and Malformed request', function (done) {
        var req = {
            query : {},
            body : {}
        };
		var resMock = {
			end: function(a,b,c){
				b.should.equal(400);
				c.should.equal('Malformed request');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byAuthorPopularity(req, {});
	});
    
	it('should sanitise the query id', function (done) {
        var req = {
            query : {
                author : {$ne : 'test'}
            }
        };
		var modelMock = {
			byAuthorPopularity: function(a, cb){
                a.should.not.eql({$ne : 'test'});
                done();
			}
		};
		testing.__set__('model', modelMock);
		testing.byAuthorPopularity(req, {});
	});
    
	it('should fail to get and respond with status 500 and message "YOU DONE BROKE IT"', function (done) {
        var req = {
            query : {
                author : 'id'
            }
        };
		var modelMock = {
			byAuthorPopularity: function(a, cb){
                cb({message : 'YOU DONE BROKE IT'})
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(500);
				c.should.equal('YOU DONE BROKE IT');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byAuthorPopularity(req, {});
	});
    
    
	it('should fail to get and respond with status 404 and message "Post could not be found"', function (done) {
        var req = {
            query : {
                author : 'id'
            }
        };
		var modelMock = {
			byAuthorPopularity: function(a, cb){
                cb(false,false)
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(404);
				c.should.equal('Posts could not be found');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byAuthorPopularity(req, {});
	});
    
	it('should respond with status 200 and data', function (done) {
        var req = {
            query : {
                author : 'id'
            }
        };
		var modelMock = {
			byAuthorPopularity: function(a, cb){
                cb(false, 'posts')
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				c.should.equal('posts');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byAuthorPopularity(req, {});
	});
    
});

describe('byViewsPopularity', function () {

	it('should fail to get and respond with status 500 and message "YOU DONE BROKE IT"', function (done) {
		var modelMock = {
			byViewsPopularity: function(cb){
                cb({message : 'YOU DONE BROKE IT'})
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(500);
				c.should.equal('YOU DONE BROKE IT');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byViewsPopularity({}, {});
	});
    
    
	it('should fail to get and respond with status 404 and message "Post could not be found"', function (done) {
		var modelMock = {
			byViewsPopularity: function(cb){
                cb(false,false)
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(404);
				c.should.equal('Posts could not be found');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byViewsPopularity({}, {});
	});
    
	it('should respond with status 200 and data', function (done) {
		var modelMock = {
			byViewsPopularity: function(cb){
                cb(false, 'posts')
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				c.should.equal('posts');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byViewsPopularity({}, {});
	});
    
});

describe('byLatest', function () {

	it('should fail to get and respond with status 500 and message "YOU DONE BROKE IT"', function (done) {
		var modelMock = {
			byLatest: function(cb){
                cb({message : 'YOU DONE BROKE IT'})
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(500);
				c.should.equal('YOU DONE BROKE IT');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byLatest({}, {});
	});
    
    
	it('should fail to get and respond with status 404 and message "Post could not be found"', function (done) {
		var modelMock = {
			byLatest: function(cb){
                cb(false,false)
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(404);
				c.should.equal('Posts could not be found');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byLatest({}, {});
	});
    
	it('should respond with status 200 and data', function (done) {
		var modelMock = {
			byLatest: function(cb){
                cb(false, 'posts')
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				c.should.equal('posts');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.byLatest({}, {});
	});
    
});