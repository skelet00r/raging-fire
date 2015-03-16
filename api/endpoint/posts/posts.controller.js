/**
 *@module endpoint
 *@namespace controller
 *@class posts
 *@static
 */
'use strict';

var model = require('./posts.model'),
    sanitizer = require('sanitizer'),
    response = require('../../service/response/response');

/**
 *
 *Gets latest 20 posts by author sorted by view count descending
 *
 *@method byAuthorPopularity
 *
 *@param req {Object} Request object with author
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Array of post objects
 *
 */
module.exports.byAuthorPopularity = function(req, res){
    if(req.query.hasOwnProperty('author')){
        var author = sanitizer.sanitize(req.query.author);
        model.byAuthorPopularity(author, function(err, data){
            if(err){
                response.end(res, 500, err.message);
            } else if(!data) {
                response.end(res, 404, 'Posts could not be found');
            } else {
                response.end(res, 200, data);
            }
        });
    } else {
        response.end(res, 400, 'Malformed request');
    }
};

/**
 *
 *Gets 20 posts sorted by view count descending
 *
 *@method byViewsPopularity
 *
 *@param req {Object} Request object
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Array of post objects
 *
 */
module.exports.byViewsPopularity = function(req, res){
    model.byViewsPopularity(function(err, data){
        if(err){
            response.end(res, 500, err.message);
        } else if(!data) {
            response.end(res, 404, 'Posts could not be found');
        } else {
            response.end(res, 200, data);
        }
    });
};

/**
 *
 *Gets latest 20 posts by date sorted descending
 *
 *@method byLatest
 *
 *@param req {Object} Request object
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Array of post objects
 *
 */
module.exports.byLatest = function(req, res){
    model.byLatest(function(err, data){
        if(err){
            response.end(res, 500, err.message);
        } else if(!data) {
            response.end(res, 404, 'Posts could not be found');
        } else {
            response.end(res, 200, data);
        }
    });
};