const stockLevelController = require('../controller/stockLevelController');

const routes = (app) => {
    app.route('/v1/stock-level')
        .post(stockLevelController.createStockLevel)
        .put(stockLevelController.descreaseStockLevel)

    app.get('/', (req, res) =>
        res.send('Node and Express server runnig...')
    );
};

module.exports = { routes };