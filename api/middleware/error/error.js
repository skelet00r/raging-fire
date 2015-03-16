/**
 *@module middleware
 *@namespace middleware
 *@class error
 *@static
 */
'use strict';

/**
 *
 *If any route hits this middleware then the result is 404.
 *This function will always be run last.
 *
 *@method index
 *
 *@param req {Object} expressjs request object
 *@param res {Object} expressjs response object
 *@param next {Function} expressjs middleware next function
 *@return {JSON} Returns 404
 */
var middleware = function (req, res, next) {
    res.status(404);
    res.json({
        code: 404,
        error: true,
        message: 'Resource could not be found'
    });
};

module.exports = middleware;