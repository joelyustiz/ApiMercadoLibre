'use strict';
const debug = require('debug')('swip:api:db');
const db = require('../lib/db');
const { config } = require('../config/index');

let services;
module.exports = async function DataBaseConnect(req, res, next) {
  if (!services) {
    debug('Connecting to database');
    try {
      services = await db(config.db);
    } catch (e) {
      return next(e);
    }
  }
  next();
};
