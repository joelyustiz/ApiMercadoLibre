'use strict';

const Sequelize = require('sequelize');
let sequelize = null;

module.exports = async function(config) {
  try {
    config = {...config, 
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      },
      query: {
        raw: true
      }
     }

    if (!sequelize) {
      sequelize = new Sequelize(config);
    }
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    
    return  sequelize
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return error;
  }
};
