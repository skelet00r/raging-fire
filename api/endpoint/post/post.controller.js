/**
 *@module endpoint
 *@namespace controller
 *@class post
 *@static
 */
'use strict';

var model = require('./post.model'),
    sanitizer = require('sanitizer'),
    response = require('../../service/response/response');

/**
 *
 *Creates a new post entry in the database
 *
 *@method create
 *
 *@param req {Object} Request object with id
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Single post with provided id
 *
 */
module.exports.create = function(req, res){
    req.body.created = new Date();
    try{
        req.body.bodyMD = JSON.parse(req.body.bodyMD);
    } catch(e){
        console.log("body already an object");
    }
    model.save(req.body,function(err, data){
        if(err){
            response.end(res, 500, err.message);
        } else {
            var resObject = {
                _id : data._id,
                title : data.title
            };
            response.end(res, 200, resObject);
        }
    });
};

/**
 *
 *Returns a post if an id is passed
 *
 *@method read
 *
 *@param req {Object} Request object with id
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Single post with provided id
 *
 */
module.exports.read = function(req, res){
    if(req.query.hasOwnProperty('id')){
        var id = sanitizer.sanitize(req.query.id);
        model.get(id, function(err, data){
            if(err){
                response.end(res, 500, err.message);
            } else if(!data) {
                response.end(res, 404, 'Post could not be found');
            } else {
                try{
                    data.bodyMD = JSON.parse(data.bodyMD);
                } catch(e){
                    console.log("body already an object");
                }
                response.end(res, 200, data);
            }
        });
    } else {
        response.end(res, 400, 'Malformed request');
    }
};

/**
 *
 *Updates the bodyMD of a post with supplied id
 *
 *@method update
 *
 *@param req {Object} Request object with id
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Post title and id
 *
 */
module.exports.update = function(req, res){
    if(req.query.hasOwnProperty('id') && req.body.hasOwnProperty('bodyMD')){
        var bodyMD = req.body.bodyMD;
        try{
            bodyMD = JSON.parse(req.body.bodyMD);
        } catch(e){
            console.log("body already an object");
        }
        var updateData = {
            updated: new Date(),
            bodyMD : bodyMD
        };
        var id = sanitizer.sanitize(req.query.id);
        model.update(id, updateData, function(err, data){
            if(err){
                response.end(res, 500, err.message);
            } else if(!data) {
                response.end(res, 404, 'Post could not be found');
            } else {
                var resObject = {
                    _id : data._id,
                    title : data.title
                };
                response.end(res, 200, resObject);
            }
        });
    } else {
        response.end(res, 400, 'Malformed request'); 
    }
};

/**
 *
 *Deletes post with supplied id
 *
 *@method delete
 *
 *@param req {Object} Request object with id
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Post title
 *
 */
module.exports.delete = function(req, res){
    if(req.query.hasOwnProperty('id')){
        var id = sanitizer.sanitize(req.query.id);
        model.remove(id, function(err, data){
            if(err){
                response.end(res, 500, err.message);
            } else if(!data) {
                response.end(res, 404, 'Post could not be found');
            } else {
                response.end(res, 200, 'Successfully deleted post: ' + data.title);
            }
        });
    } else {
        response.end(res, 400, 'Malformed request');
    }
};