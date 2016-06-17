'use strict';

var _ = require('lodash');
var Muffin = require('./muffin.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Muffin
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Muffin.find(function (err, muffins) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(muffins);
  });
};

/**
 * Get a single Muffin
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Muffin.findById(req.params.id, function (err, muffin) {
    if (err) { return handleError(res, err); }
    if (!muffin) { return res.status(404).end(); }
    return res.status(200).json(muffin);
  });
};

/**
 * Creates a new Muffin in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Muffin.create(req.body, function (err, muffin) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(muffin);
  });
};

/**
 * Updates an existing Muffin in the DB.
 *
 * @param req
 * @param res
 */
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

/**
 * Deletes a Muffin from the DB.
 *
 * @param req
 * @param res
 */
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
