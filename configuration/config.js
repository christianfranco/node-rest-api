module.exports = {
  development: {
    DB_URL: 'mongodb://localhost/productDEV',
    PORT: 4000,
    LOG_LEVEL: 'debug'
  },
  production: {
    DB_URL: 'mongodb://localhost/productPRD',
    PORT: 4000,
    LOG_LEVEL: 'warn'
  },
  test: {
    DB_URL: 'mongodb://localhost/productTEST',
    PORT: 4000,
    LOG_LEVEL: 'error'
  }
};
