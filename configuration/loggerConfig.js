const winston = require('winston');
const config = require("./config");
const { combine, timestamp, prettyPrint, colorize, errors } = winston.format;

const environment = process.env.NODE_ENV;

const logger = winston.createLogger({
  level: config[environment].LOG_LEVEL,
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp(),
    prettyPrint()
  ),
  transports: [new winston.transports.File({ filename: 'logs/app.log' })]
});

winston.level = config[environment].LOG_LEVEL;

if (environment !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = { logger };
