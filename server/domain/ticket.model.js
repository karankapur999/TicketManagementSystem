      'use strict';

      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;
      var crypto = require('crypto');

      var TicketSchema = new Schema({
        'ticket_category': String,
        'ticket_subject': String, //required
        'ticket_description': String, //required
        'ticket_due_by_time': Date,
        'ticket_agent_email': { type: String, default: "" }, //required
        'ticket_city': String,
        'ticket_source': String,
        'ticket_issue_summary': String,
        'ticket_resolution': String,
        'ticket_cancellation_reason': String,
        'ticket_created_by': String, //required
        'ticket_assigned_by': String,
        'priority': { type: Number , enum: [0, 1, 2, 3, 4, 5], default : 0 }, //priority is by default set to 0
        'reschedule_at': Date,
        'is_rescheduled_ticket': { type: Boolean, default: false },
        'reschedule_ticket_time': Date,
        'created_at': { type: Date, default: new Date() },
        'comments': [{
            'comment': String,
            'added_by': String,
            'added_at': Date
        }],
        'ticket_cancelled_by': String,
        'status': { type: String, enum: ["OPEN", "ASSIGNED", "CANCELLED", "CLOSED", "RESCHEDULED"], default: "OPEN"},
        'history_log': [ {
        'updated_by': String,
          'updated_at': Date,
          'action': String
         } ]
      });


      module.exports = mongoose.model('cmsticket', TicketSchema);
