/**
 *@module middleware
 *@namespace middleware
 *@class call-logger
 *@static
 */
'use strict';

/**
 *
 *Log called routes and methods to the cli
 *
 *@method index
 *
 *@param req {Object} expressjs request object
 *@param res {Object} expressjs response object
 *@param next {Function} expressjs middleware next function
 *@return {JSON} Returns 404
 */
var middleware = function (req, res, next) {
    console.log(req.method + ' ' + req.originalUrl);
    next();
};

module.exports = middleware;