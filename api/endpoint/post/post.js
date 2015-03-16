'use strict';

var controller = require('./post.controller');
var router = require('express').Router();

router.post('/', controller.create);
router.get('/', controller.read);
router.put('/', controller.update);
router.delete('/', controller.delete);

module.exports = router;