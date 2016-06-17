      'use strict';

      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;
      var crypto = require('crypto');

      var TicketSchema = new Schema({
        'ticket_category': String,
        'ticket_subject': String,
        'ticket_description': String,
        'ticket_url': String,
        'ticket_due_by_time': String,
        'ticket_agent_name': String,
        'ticket_agent_email': String,
        'ticket_status': String,
        'ticket_priority': String,
        'ticket_type': String,
        'ticket_request_date': String,
        'ticket_city': String,
        'ticket_source': String,
        'ticket_issue_summary': String,
        'ticket_resolution': String,
        'ticket_cancellation_reason': String,
        'ticket_requester_name': String,
        'priority': { type: Number },
        'created_at': { type: Date, default: new Date() }
      });


      module.exports = mongoose.model('cmsticket', TicketSchema);
