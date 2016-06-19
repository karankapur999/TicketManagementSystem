'use strict';

var dba = require('../../dbAccessLayer/index');
var TicketCMS = dba.tickets;

var ticketsCMS = {
  
  saveTickets: function(ticketdata) {
  	console.log('This is ticket data', ticketdata);
  	return TicketCMS.saveTickets(ticketdata)
  },

  updateTicket: function(wherequery, data, options) {
  	return TicketCMS.updateTicket(wherequery, data, options);
  },

  getTickets: function(wherequery, filterData, limit, skip, sortBy) {
  	if ( !limit )  limit = 10;
  	if (!skip) skip = 0;
  	if (!sortBy) sortBy = "-created_at"; 
  	return TicketCMS.getTickets(wherequery, filterData, limit, skip, sortBy);
  }

};


module.exports = ticketsCMS;
