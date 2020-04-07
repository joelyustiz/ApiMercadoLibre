'use strict';

const debug = require('debug')('api');
const http = require('http');
const chalk = require('chalk');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const DataBaseConnect = require("./route/dataBaseConnect")
const Api = require('./route/api');

const app = express();
const server = http.createServer(app);

const { config } = require('./config/index');

const {
  logErrors,
  errorHandler,
  handleFatalError,
  wrapErrors
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('*', DataBaseConnect);

// Routes
Api(app);

// Catch 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

if (!module.parent) {
  process.on('uncaughtException', handleFatalError);
  process.on('unhandledRejection', handleFatalError);

  server.listen(config.server.port, () => {
    debug(
      `${chalk.green('[app]')} server listening on port ${
        config.server.port
      }`
    );
  });
}

module.exports = server;
