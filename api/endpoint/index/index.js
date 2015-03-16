'use strict';

var controller = require('./index.controller');
var router = require('express').Router();

router.get('/', controller.index);

module.exports = router;