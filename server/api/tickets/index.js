'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./ticket.controller');

router.post('/create/ticket', controller.createTicket); // This API is used to create the ticket

router.put('/update/ticket', controller.updateTicket); // This API is used to update the ticket

router.get('/get/ticket/:page/:ticket_agent_email?/:ticket_created_by?/:priority?/:status?', controller.getTicket); // get Ticket on Page Number

router.put('/add/comments', controller.addComment); // add comment specifically to a ticket


module.exports = router;
