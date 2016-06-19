'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./ticket.controller');
var auth = require('../../auth/auth.service');


router.post('/create/ticket', auth.isAuthenticated(), controller.createTicket); // This API is used to create the ticket

router.put('/update/ticket', auth.isAuthenticated(), controller.updateTicket); // This API is used to update the ticket

router.get('/get/ticket/:page/:ticket_agent_email?/:ticket_created_by?/:priority?/:status?', controller.getTicket); // get Ticket on Page Number

router.put('/add/comments', auth.isAuthenticated(), controller.addComment); // add comment specifically to a ticket


module.exports = router;
