/**
 *@module service
 *@namespace service
 *@class response
 *@static
 */

/**
 *
 *Used as a wrapper for res.end or res.json with additional logic
 *
 *@method end
 *
 *@param res {Object} expressjs response object
 *
 *@param [status] {Number} can be replaced with message
 *
 *@param [message] {String} if not defined will assume based on status
 *
 *@example
 *  response.end(res, 200, 'All is good in the hood');
 *@return {JSON} 
 */
module.exports.end = function (res, status, message) {

    var error = false;
    var res = res;

    //Check to see if res is undefined, if it is then throw an error because res is required
    if (typeof (res) === 'undefined') {
        throw new Error('Response object missing and required');
    }

    //Check if status has been set use status as the message and assume that the status is 200
    if (typeof (status) !== 'number') {
        message = status;
        status = 200;
    }

    //Check is message is not defined, is thats the case then check the status and add a message accordingly
    // if status isnt set then assume worst case and set status to 500
    if (typeof (message) === 'undefined') {
        if (status === 404) {
            message = 'Page not found';
        } else if (status === 401) {
            message = 'Unathorized access';
        } else if (status === 403) {
            message = 'Forbidden';
        } else if (status === 400) {
            message = 'Missing parameters';
        } else {
            status = 500;
            message = 'Server Error';
        }
    }

    //If status is bigger than 200 then set error to true
    //Not using all the error code so this works correctly
    //204 is used in the app but thats in the middleware
    //and requiring this service isnt necessary so this works
    if (status > 200) {
        error = true;
    }

    //Format is personal preference, can see if there is an error and 
    //what the status code is straight away from browser
    //(can use f12 too but at a VERY quick glance its obvious and not too much overhead)
    //It also helps JSON.stringify not fail if for example a string is passed as the message
    //Because an object is created and the message that is passed is plugged into the response object as part of this object
    //Saves all the type checking etc...
    res.status(status);
    res.end(JSON.stringify({
        code: status,
        error: error,
        message: message
    }));

};