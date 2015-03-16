'use strict';

var express = require('express');

var preRouter = express.Router();
preRouter.all('*', require('./call-logger/call-logger'));
preRouter.all('*', require('./cors/cors'));

var postRouter = express.Router();
postRouter.all('*', require('./error/error'));

module.exports = {
    pre : preRouter,
    post : postRouter
};