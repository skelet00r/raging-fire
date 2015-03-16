'use strict';

var should = require('should'),
	rewire = require("rewire"),
	testing = rewire('./cors');

describe('middleware cors', function () {
    
    it('should respond with 500 for origin The bat cave', function (done) {
        var res = {
            sendStatus : function(a){
                a.should.equal(500);
                done();
            }
        };
        var req = {
            method : 'OPTIONS',
            headers : {
                origin : 'The bat cave'
            }
        };
        testing(req, res, {});
    });
    
     it('should set headers & allow-origin to http://localhost:3000 for preflight request', function (done) {
            var count = 0;
            var req = {
                headers : {
                    origin : 'http://localhost:3000'
                },
                method : 'OPTIONS'
            };
            var res = {
                header : function(a,b){
                    count++
                    if(count === 1){
                        a.should.equal('Access-Control-Allow-Origin');
                        b.should.equal('http://localhost:3000');
                    } else if(count === 2){
                        a.should.equal('Access-Control-Allow-Credentials');
                        b.should.equal(true);
                    } else if(count === 3){
                        a.should.equal('Access-Control-Allow-Methods');
                        b.should.equal('GET, PUT, POST, OPTIONS, DELETE');
                    } else if(count === 4){
                        a.should.equal('Access-Control-Allow-Headers');
                        b.should.equal('X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
                    } else if(count === 5){
                        a.should.equal('Access-Control-Max-Age');
                        b.should.equal('60');
                    }
                },
                sendStatus : function(a){
                    a.should.equal(204);
                    done();
                }
            }
            var next = function(){

            };
            testing(req, res, next);
        }); 
    
     it('should set headers & allow-origin to http://localhost:3000 then let the request through', function (done) {
            var count = 0;
            var req = {
                headers : {
                    origin : 'http://localhost:3000'
                },
                method : 'POST'
            };
            var res = {
                header : function(a,b){
                    count++
                    if(count === 1){
                        a.should.equal('Access-Control-Allow-Origin');
                        b.should.equal('http://localhost:3000');
                    } else if(count === 2){
                        a.should.equal('Access-Control-Allow-Credentials');
                        b.should.equal(true);
                    } else if(count === 3){
                        a.should.equal('Access-Control-Allow-Methods');
                        b.should.equal('GET, PUT, POST, OPTIONS, DELETE');
                    } else if(count === 4){
                        a.should.equal('Access-Control-Allow-Headers');
                        b.should.equal('X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
                    } else if(count === 5){
                        a.should.equal('Access-Control-Max-Age');
                        b.should.equal('60');
                    }
                }
            }
            var next = function(){
                //weve reached our destination
                done();
            };
            testing(req, res, next);
        });     
    
    it('should set headers & allow-origin to chrome-extension://blahblah then let the request through', function (done) {
            var count = 0;
            var req = {
                headers : {
                    origin : 'chrome-extension://blahblah'
                },
                method : 'POST'
            };
            var res = {
                header : function(a,b){
                    count++
                    if(count === 1){
                        a.should.equal('Access-Control-Allow-Origin');
                        b.should.equal('chrome-extension://blahblah');
                    } else if(count === 2){
                        a.should.equal('Access-Control-Allow-Credentials');
                        b.should.equal(true);
                    } else if(count === 3){
                        a.should.equal('Access-Control-Allow-Methods');
                        b.should.equal('GET, PUT, POST, OPTIONS, DELETE');
                    } else if(count === 4){
                        a.should.equal('Access-Control-Allow-Headers');
                        b.should.equal('X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
                    } else if(count === 5){
                        a.should.equal('Access-Control-Max-Age');
                        b.should.equal('60');
                    }
                }
            }
            var next = function(){
                //weve reached our destination
                done();
            };
            testing(req, res, next);
        });
    
    it('should set headers & allow-origin to undefined then let the request through', function (done) {
            var count = 0;
            var req = {
                headers : {

                },
                method : 'POST'
            };
            var res = {
                header : function(a,b){
                    count++
                    if(count === 1){
                        a.should.equal('Access-Control-Allow-Origin');
                        should(b).equal(undefined);
                    } else if(count === 2){
                        a.should.equal('Access-Control-Allow-Credentials');
                        b.should.equal(true);
                    } else if(count === 3){
                        a.should.equal('Access-Control-Allow-Methods');
                        b.should.equal('GET, PUT, POST, OPTIONS, DELETE');
                    } else if(count === 4){
                        a.should.equal('Access-Control-Allow-Headers');
                        b.should.equal('X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
                    } else if(count === 5){
                        a.should.equal('Access-Control-Max-Age');
                        b.should.equal('60');
                    }
                }
            }
            var next = function(){
                //weve reached our destination
                done();
            };
            testing(req, res, next);
        });
});