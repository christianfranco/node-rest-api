const productController = require('../controller/productController');

const routes = (app) => {
    app.route('/v1/product')
        .post(productController.createProduct)

    app.route('/v1/product/decrease/quantity')
        .put(productController.descreaseProduct);

    app.route('/v1/product/:productName')
        .delete(productController.deleteProduct)
        .get(productController.checkProduct);
};

module.exports = { routes };
