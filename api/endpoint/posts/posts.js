'use strict';

var controller = require('./posts.controller');
var router = require('express').Router();

router.get('/popular/author', controller.byAuthorPopularity);
router.get('/popular/views', controller.byViewsPopularity);
router.get('/latest', controller.byLatest);

module.exports = router;