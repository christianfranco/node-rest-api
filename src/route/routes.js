const stockLevelController = require('../controller/stockLevelController');

const routes = (app) => {
    app.route('/v1/product/add')
        .post(stockLevelController.createStockLevel);

    app.get('/', (req, res) =>
        res.send('Node and Express server runnig...')
    );

};

module.exports = { routes };