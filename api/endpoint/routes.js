'use strict';

var express = require('express'),
    router = express.Router();

router.use('/', require('./index/index'));
router.use('/post', require('./post/post'));
router.use('/posts', require('./posts/posts'));

module.exports = router;