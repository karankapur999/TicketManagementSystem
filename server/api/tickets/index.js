'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./ticket.controller');

router.post('/createticket', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
