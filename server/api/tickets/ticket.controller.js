'use strict';

var _ = require('lodash');
var Ticket = require('./ticket.model'); //Model for Tickets

function handleError (res, err) {
  return res.status(500).send({ 'is_error': true,
                                'status_code':500,
                                'err': err
                              });
}


exports.index = function (req, res) {
  Muffin.find(function (err, muffins) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(muffins);
  });
};


exports.show = function (req, res) {
  Muffin.findById(req.params.id, function (err, muffin) {
    if (err) { return handleError(res, err); }
    if (!muffin) { return res.status(404).end(); }
    return res.status(200).json(muffin);
  });
};

exports.create = function (req, res) {
  console.log('This is body', req.body)
  if ( !req.body.abc )  return handleError(res, 'Ticket Parameters missing');
  Ticket.create(req.body, function (err, muffin) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(muffin);
  });
};


exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Muffin.findById(req.params.id, function (err, muffin) {
    if (err) { return handleError(res, err); }
    if (!muffin) { return res.status(404).end(); }
    var updated = _.merge(muffin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(muffin);
    });
  });
};


exports.destroy = function (req, res) {
  Muffin.findById(req.params.id, function (err, muffin) {
    if (err) { return handleError(res, err); }
    if (!muffin) { return res.status(404).end(); }
    muffin.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
