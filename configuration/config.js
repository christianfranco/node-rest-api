module.exports = {
  development: {
    DB_URL: 'mongodb://localhost/stockDEV',
    PORT: 4000,
    LOG_LEVEL: 'debug'
  },
  production: {
    DB_URL: 'mongodb://localhost/stockPRD',
    PORT: 4000,
    LOG_LEVEL: 'warn'
  },
  test: {
    DB_URL: 'mongodb://localhost/stockTEST',
    PORT: 4000,
    LOG_LEVEL: 'error'
  }
};