require('dotenv').config();
const debug = require('debug')('swip:db')

const config = {
  db: {
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST,
    username:  process.env.DB_USER,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: s => debug(`DB: ${s}`)
  },
  server: {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8080
  }
};

module.exports = { config };
