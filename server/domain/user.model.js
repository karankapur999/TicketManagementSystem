      'use strict';

      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;
      var crypto = require('crypto');

      var UserSchema = new Schema({
        'email':{ type: String, lowercase: true, required: true, unique: true },
        'name': String,
        'hashedPassword': String,
        'city':String,
        'department': String,
        'type': { type: String,  enum: ["ADMIN", "USER"], default: "ADMIN" }

      });


      module.exports = mongoose.model('users', UserSchema);
