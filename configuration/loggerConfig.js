const winston = require('winston');
const config = require("./config");
const environment = process.env.NODE_ENV;

const logger = winston.createLogger({
    level: config[environment].LOG_LEVEL,
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
    transports: [
        new winston.transports.File({ filename: 'logs/app.log' }),
    ]
});

winston.level = config[environment].LOG_LEVEL;

if (environment !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = { logger };
