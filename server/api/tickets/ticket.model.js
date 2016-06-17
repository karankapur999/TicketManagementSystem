      'use strict';

      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;
      var crypto = require('crypto');

      var TicketSchema = new Schema({
        ticket_subject: String,
        ticket_description: String,
        ticket_url: String,
        ticket_due_by_time: String,
        ticket_agent_name: String,
        ticket_agent_email: String,
        ticket_status: String,
        ticket_priority: String,
        ticket_type: String,
        ticket_request_id: {
            type: String
        },
        ticket_request_date: String,
        ticket_professional_name: String,
        ticket_sender_type: String,
        ticket_city: String,
        ticket_source: String,
        ticket_issue_summary: String,
        ticket_resolution: String,
        ticket_cancellation_reason: String,
        ticket_requester_name: String,
        triggered_event: String,
        ticket_channel_of_complaint: String,
        ticket_service_delivered_status: String,
        ticket_query_category: String,
        ticket_partner_at_fault: String,
        ticket_bad_customer_experience: String,
        created_at: { type: Date, default: new Date() }
      });


      module.exports = mongoose.model('cmsticket', TicketSchema);
