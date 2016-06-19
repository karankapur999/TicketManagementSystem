  'use strict';

var _ = require('lodash');
var Error = require('../../error');
var httpResponse = require('../../responses');
var TicketDM = require('./../../dbAdapters/dbManipulationLayer').tickets; //dm for tickets




exports.createTicket = function (req, res) {
  console.log('this is Errors', Error)

  var user_email = /*req.user.email ||*/ "Server"; // can be commented if we have users in DB

  if ( !req.body.ticket_subject )  return Error.errorMissingParam(res, 'ticket_subject');
  if ( !req.body.ticket_description )  return Error.errorMissingParam(res, 'ticket_description');
  if ( !req.body.ticket_agent_email )  return Error.errorMissingParam(res, 'ticket_agent_email');
  req.body.ticket_created_by =   user_email ;
  TicketDM.saveTickets(req.body).then(function(ticketObject) {
    return httpResponse.successResponse(res, ticketObject);
  })
  .catch(function(error) {
      return Error.errorDB(res, error);
    })

};


exports.updateTicket = function (req, res) {

  var whereQuery  = {}, data = {}, options = {}, masterArray = [];
  var ticketId = req.body.ticket_id, action;
  var user_email = /*req.user.email ||*/ "Server"; // can be commented if we have users in DB


  if ( !req.body.ticket_id )  return Error.errorMissingParam(res, 'ticket_id');

  whereQuery['_id'] = ticketId;


  if (req.body.reschedule_ticket_time_value) { //Reshedule ticket block
    action = "Ticket Rescheduled";
    data = { '$set': {'is_rescheduled_ticket': true, 'reschedule_ticket_time':  req.body.reschedule_ticket_time, 'status': "RESCHEDULED"} };
  }

  else if (req.body.assign_to) {     //Reshedule ticket block
    data = { '$set': {'ticket_agent_email': req.body.assign_to, 'ticket_assigned_by':  user_email, 'status': "ASSIGNED"} };
    action = "Ticket Assingment";
  }

  else if (req.body.cancel_ticket) {     //Reshedule ticket block
 
    data = { '$set': {'ticket_cancelled_by':  user_email, 'status': "CANCELLED"} };
    action = "Ticket CANCELLED";

  }

   else if (req.body.priority_value) {     //Reshedule ticket block
    data = { '$set': {'priority':  req.body.priority_value } };
    action = "Ticket Priority change";
  }
  console.log(data)

  data['$push'] = { 'history_log': {
                       'updated_by': user_email,
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
      return Error.errorDB(res, error);
  })   
};

exports.getTicket = function (req, res) {
  var whereQuery = { }, filterData = { }, LIMIT = 10;
  var skip = LIMIT * req.params.page;
  if (req.params.ticket_agent_email) whereQuery['ticket_agent_email'] = req.body.ticket_agent_email;
  if (req.params.ticket_created_by) whereQuery['ticket_created_by'] = req.body.ticket_created_by;
  if (req.params.priority) whereQuery['priority'] = req.body.priority;
  if (req.params.status) whereQuery['status'] = req.body.status;
 

  TicketDM.getTickets(whereQuery, filterData, LIMIT, skip, '-created_at').then(function(ticktsDetails) {
    return httpResponse.successResponse(res, ticktsDetails);
  })
  .catch(function(error) {
      console.log('This is error', error)
      return Error.errorDB(res, error);
  }) 
}

exports.addComment = function (req, res) {

  var whereQuery  = {}, data = {}, options = {}, masterArray = [];
  var ticketId = req.body.ticket_id;
  var user_email = /*req.user.email ||*/ "Server"; // can be commented if we have users in DB


  if ( !req.body.ticket_id )  return Error.errorMissingParam(res, 'ticket_id');
  if ( !req.body.comment )  return Error.errorMissingParam(res, 'comment');

  whereQuery['_id'] = ticketId;

  data['$push'] = {  'history_log': {
                       'updated_by': user_email,
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
      return Error.errorDB(res, error);
  })

}



