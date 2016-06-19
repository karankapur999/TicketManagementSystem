"use strict";

var Promise = require('bluebird');
var TicketModel = require('./../../../domain/ticket.model'); //Model for Tickets

Promise.promisifyAll(TicketModel);


//Models

var dao_functions = { };

dao_functions.saveTickets = function(ticketData) {
	return TicketModel.createAsync(ticketData);	
};

dao_functions.getTickets = function(whereQuery, filterData, limit, skip, sort) {
	return TicketModel.find(whereQuery, filterData).skip(skip).limit(limit).sort(sort).exec();	
};

dao_functions.updateTicket = function(whereQuery, data, options) {
	return TicketModel.findOneAndUpdateAsync(whereQuery, data, options);	
};

module.exports = dao_functions;	