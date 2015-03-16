/**
 *@module middleware
 *@namespace middleware
 *@class cors
 *@static
 */
'use strict';

/**
 *
 *Checks the origin headers to see where the request came from, if the request is in the whitelist the allow-origin header is sent to the browser.
 *
 *The preflight request is sent using the OPTIONS method and if detected this will respond with status 204
 *
 *@method index
 *
 *@param req {Object} expressjs request object
 *@param res {Object} expressjs response object
 *@param next {Function} expressjs middleware next function
 *@return {JSON} Returns 204 if OPTIONS(preflight) or continues to next
 */
var middleware = function (req, res, next) {
    
    //Worst whitelist ever, but this app isn't intended go live so it doesnt have any valid domains
    //Could also control this via access tokens etc.. 
    //but would need to run this middleware on routes that didnt involve any auth
    var whitelist = ['http://localhost:3000','http://localhost:3001'];
    //if origin is undefined then not a cors request and a direct request so allow
    //cors headers set by browser and cannot be controlled by js
    //also allow chrome extensions
    if (typeof(req.headers.origin) === 'undefined' || req.headers.origin.indexOf('chrome-extension://') > -1 || whitelist.indexOf(req.headers.origin) > -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
        res.header('Access-Control-Max-Age', '60');

        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
            //Send 204 back with headers
            res.sendStatus(204);
        } else {
            //Weve done this already so continue with request
            next();
        }
    } else {
        //Deny access for all other origins
        console.log("CORS denied", req.headers.origin);
        res.sendStatus(500);
    }

};

module.exports = middleware;