'use strict';
const boom = require('@hapi/boom');

function notFoundHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;