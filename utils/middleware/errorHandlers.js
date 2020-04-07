'use strict';
const { config } = require('../../config');
const boom = require('@hapi/boom');
const chalk = require('chalk')

function withErrorStack(error, stack) {
  if (config.server.dev) {
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {
  console.log(`${chalk.red('[LOG ERROR]: ')} ${err}`);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next();
}

function errorHandler(err, req, res, next) {
  // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

function handleFatalError(err) {
  let text = err.message;

  if (err.isBoom) {
    const {
      output: { payload }
    } = err;
    text = payload;
  }

  console.error(`${chalk.red('[FATAL ERROR]: ')} ${text}`);
  console.error(err.stack);

  process.exit(1);
}

module.exports = {
  logErrors,
  errorHandler,
  handleFatalError,
  wrapErrors
};
