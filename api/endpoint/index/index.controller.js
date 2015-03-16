/**
 *@module endpoint
 *@namespace controller
 *@class index
 *@static
 */
'use strict';

var pjson = require('../../../package.json'),
    response = require('../../service/response/response');

/**
 *
 *Returns basic information about the api to the user
 *
 *@method index
 *
 *@param req {Object} Request object
 *
 *@param res {Object} Response object
 *
 *@return {JSON} Basic information about the api 
 *
 */
module.exports.index = function (req, res) {
    var object = {
        name: pjson.name,
        description: pjson.description,
        version: pjson.version,
        author: pjson.author
    };

    response.end(res, 200, object);
};