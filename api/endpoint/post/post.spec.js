'use strict';

var should = require('should'),
	rewire = require("rewire"),
	testing = rewire('./post.controller');

describe('create', function () {

	it('should add created to req.body as date', function (done) {
        var req = {
            body : {}
        };
		var modelMock = {
			save: function(a, cb){
                a.should.have.property('created');
                (a.created).should.be.an.instanceOf(Date);
				done();
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.create(req, {});
	});
    
	it('should respond with status 500 and message "OMG IT BROKE"', function (done) {
        var req = {
            body : {}
        };
		var modelMock = {
			save: function(a, cb){
                cb({message: 'OMG IT BROKE'});
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(500);
				c.should.equal('OMG IT BROKE');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.create(req, {});
	});
    
	it('should respond with status 200 and message with _id and title', function (done) {
        var req = {
            body : {}
        };
		var modelMock = {
			save: function(a, cb){
                cb(false, {_id: 'abc', title: 'Jackson 5'});
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				(c._id).should.equal('abc');
				(c.title).should.equal('Jackson 5');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.create(req, {});
	});
	

});

describe('read', function () {
    
	it('should respond with status 400 and Malformed request', function (done) {
        var req = {
            query : {}
        };
		var resMock = {
			end: function(a,b,c){
				b.should.equal(400);
				c.should.equal('Malformed request');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.read(req, {});
	});
	
	it('should sanitise the query id', function (done) {
        var req = {
            query : {
                id : {$ne : 'test'}
            }
        };
		var modelMock = {
			get: function(a, cb){
                a.should.not.eql({$ne : 'test'});
                done();
			}
		};
		testing.__set__('model', modelMock);
		testing.read(req, {});
	});
    
	it('should fail to get and respond with status 500 and message "YOU DONE BROKE IT"', function (done) {
        var req = {
            query : {
                id : 'x'
            }
        };
		var modelMock = {
			get: function(a, cb){
                a.should.equal('x');
                cb({message : 'YOU DONE BROKE IT'});
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
		testing.read(req, {});
	});
    
	it('should fail to get and respond with status 404 and message "Post could not be found"', function (done) {
        var req = {
            query : {
                id : 'x'
            }
        };
		var modelMock = {
			get: function(a, cb){
                a.should.equal('x');
                cb(false,false);
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(404);
				c.should.equal('Post could not be found');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.read(req, {});
	});
    
	it('should fail to get and respond with 200 and data', function (done) {
        var req = {
            query : {
                id : 'x'
            }
        };
		var modelMock = {
			get: function(a, cb){
                a.should.equal('x');
                cb(false,{bodyMD : 'yo'});
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				(c.bodyMD).should.equal('yo');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.read(req, {});
	});
    
});

describe('update', function () {
    
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
		testing.update(req, {});
	});
    
	it('should respond with status 400 and Malformed request', function (done) {
        var req = {
            query : {
                id : 'x'
            },
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
		testing.update(req, {});
	});
    
	it('should respond with status 400 and Malformed request', function (done) {
        var req = {
            query : {},
            body : {
                bodyMD : 'x'
            }
        };
		var resMock = {
			end: function(a,b,c){
				b.should.equal(400);
				c.should.equal('Malformed request');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.update(req, {});
	});
    
	it('should sanitise the query id', function (done) {
        var req = {
            query : {
                id : {$ne : 'test'}
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			update: function(a, b, cb){
                a.should.not.eql({$ne : 'test'});
                done();
			}
		};
		testing.__set__('model', modelMock);
		testing.update(req, {});
	});

	it('should add updated to req.body as date ', function (done) {
        var req = {
            query : {
                id : 'id'
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			update: function(a, b, cb){
                b.should.have.property('updated');
                (b.updated).should.be.an.instanceOf(Date);
                done();
			}
		};
		testing.__set__('model', modelMock);
		testing.update(req, {});
	});
    
	it('should fail to get and respond with status 500 and message "YOU DONE BROKE IT"', function (done) {
        var req = {
            query : {
                id : 'id'
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			update: function(a, b, cb){
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
		testing.update(req, {});
	});
    
	it('should fail to get and respond with status 404 and message "Post could not be found"', function (done) {
        var req = {
            query : {
                id : 'id'
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			update: function(a, b, cb){
                cb(false,false)
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(404);
				c.should.equal('Post could not be found');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.update(req, {});
	});
    
	it('should respond with status 200 and data with _id and title', function (done) {
        var req = {
            query : {
                id : 'id'
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			update: function(a, b, cb){
                cb(false,{_id : '1', title : 'xyz'})
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				(c._id).should.equal('1');
				(c.title).should.equal('xyz');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.update(req, {});
	});
    
});

describe('delete', function () {
    
	it('should respond with status 400 and Malformed request', function (done) {
        var req = {
            query : {}
        };
		var resMock = {
			end: function(a,b,c){
				b.should.equal(400);
				c.should.equal('Malformed request');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.delete(req, {});
	});	
    
    it('should sanitise the query id', function (done) {
        var req = {
            query : {
                id : {$ne : 'test'}
            }
        };
		var modelMock = {
			remove: function(a, cb){
                a.should.not.eql({$ne : 'test'});
                done();
			}
		};
		testing.__set__('model', modelMock);
		testing.delete(req, {});
	});

    it('should fail to get and respond with status 500 and message "YOU DONE BROKE IT"', function (done) {
        var req = {
            query : {
                id : 'id'
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			remove: function(a, cb){
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
		testing.delete(req, {});
	});
    
	it('should fail to get and respond with status 404 and message "Post could not be found"', function (done) {
        var req = {
            query : {
                id : 'id'
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			remove: function(a, cb){
                cb(false,false)
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(404);
				c.should.equal('Post could not be found');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.delete(req, {});
	});
    
	it('should respond with status 200 and data with _id and title', function (done) {
        var req = {
            query : {
                id : 'id'
            },
            body : {
                bodyMD : 'object'
            }
        };
		var modelMock = {
			remove: function(a, cb){
                cb(false,{title : 'xyz'})
			}
		};
		testing.__set__('model', modelMock);
		var resMock = {
			end: function(a,b,c){
				b.should.equal(200);
				c.should.equal('Successfully deleted post: xyz');
				done();
			}
		};
		testing.__set__('response', resMock);
		testing.delete(req, {});
	});
});
    