'use strict';

var _ = require('lodash');
var Error = require('../../error');
var Errors = Error.errors;
var httpResponse = require('../../responses');



exports.createTicket = function (req, res) {

  console.log('This is body', req.body)

  if ( !req.body.ticket_subject )  return handleError(res, 'Ticket ticket_subject Parameters missing');
  if ( !req.body.ticket_description )  return handleError(res, 'Ticket ticket_description Parameters missing');
  if ( !req.body.ticket_agent_email )  return handleError(res, 'Ticket ticket_agent_email Parameters missing');

  TicketDM.saveTickets(req.body).then(function(ticketObject) {
    return httpResponse.successResponse(res, ticketObject);
  })
  .catch(function(error) {
      return Errors.errorDB(res, error);
    })

};


exports.updateTicket = function (req, res) {

  var whereQuery  = {}, data = {}, options = {}, masterarray = [];
  var ticketId = req.body.ticket_id, action;

  if ( !req.body.ticket_id )  return handleError(res, 'Ticket ticket_id Parameters missing');

  whereQuery['_id'] = ticketId;

  data = { '$set': { status: req.body.status } };

  if (req.body.reschedule_ticket_time_value) { //Reshedule ticket block
    data['is_rescheduled_ticket'] = true;
    data['reschedule_ticket_time'] = req.body.reschedule_ticket_time;
    data['status'] = "RESCHEDULED"
    action = "Ticket Rescheduled";
  }

  else if (req.body.assign_to) {     //Reshedule ticket block
    data['ticket_agent_email'] = req.body.assign_to;
    data['status'] = "ASSIGNED"
    data['ticket_assigned_by'] = "hghecdghhrfvhj";
    action = "Ticket Assingment";
  }

  else if (req.body.cancel_ticket) {     //Reshedule ticket block
    data['ticket_agent_email'] = req.body.assign_to;
    data['status'] = "CANCELLED"
    data['ticket_cancelled_by'] = "hghecdghhrfvhj";
    action = "Ticket CANCELLED";

  }

   else if (req.body.priority_value) {     //Reshedule ticket block
    data['priority'] = req.body.priority_value;
    action = "Ticket Priority change";
  }


  data['$push'] = { 'history_log': {
                       'updated_by': "testing",
                       'updated_at': new Date(),
                       'action': action
                    } 
                  };

  TicketDM.updateTicket(whereQuery, data, options).then(function(object) {
    if(object == null)  return handleSuccess(res, [], "No data Set found"); 
    masterArray.push(object);  
    return httpResponse.successResponse(res, masterArray);
  })
  .catch(function(error) {
      return Errors.errorDB(res, error);
  })   
};

exports.getTicket = function (req, res) {
  var whereQuery = { }, filterData = { }, LIMIT = 10;
  var skip = LIMIT * req.params.page;
  if (req.params.ticket_agent_email) whereQuery['ticket_agent_email'] = req.body.ticket_agent_email;
  if (req.params.ticket_created_by) whereQuery['ticket_created_by'] = req.body.ticket_created_by;
  if (req.params.priority) whereQuery['priority'] = req.body.priority;
  if (req.params.status) whereQuery['status'] = req.body.status;
 

  TicketDM.getTickets(whereQuery, filterData, limit, skip, '-created_at').then(function(ticktsDetails) {
    return httpResponse.successResponse(res, ticktsDetails);
  })
  .catch(function(error) {
      console.log('This is error', error)
      return Errors.errorDB(res, error);
  }) 
}

exports.addComment = function (req, res) {

  var whereQuery  = {}, data = {}, options = {}, masterArray = [];
  var ticketId = req.body.ticket_id;

  if ( !req.body.ticket_id )  return handleError(res, 'Ticket ticket_id Parameters missing');
  if ( !req.body.comment )  return handleError(res, 'Ticket ticket comment Parameters missing');

  whereQuery['_id'] = ticketId;

  data['$push'] = {  'history_log': {
                       'updated_by': "testing",
                       'updated_at': new Date(),
                       'action': 'comment addition'
                      },
                       
                      'comments' :{
                        'comment': req.body.comment,
                        'added_by': 'String',
                        'added_at': new Date()
                      }
                    
                  };

  TicketDM.updateTicket(whereQuery, data, options).then(function(object) {
    if(object == null)  return handleSuccess(res, [], "No data Set found"); 
    masterArray.push(object);  
    return httpResponse.successResponse(res, masterArray);
  })
  .catch(function(error) {
      console.log('This is error', error)
      return Errors.errorDB(res, error);
  })

}



