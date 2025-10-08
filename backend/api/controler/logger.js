// logger.js
const winston = require('winston');
require('winston-mongodb');
const mongoose = require('mongoose');

// Use the existing Mongoose connection
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: mongoose.connection, // use existing connection
      collection: 'system_logs',
      tryReconnect: true
    })
  ],
});

module.exports = logger;
