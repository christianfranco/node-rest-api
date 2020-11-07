const productController = require('../controller/productController');

const routes = (app) => {
    app.route('/v1/product-level')
        .post(productController.createProduct)
        .put(productController.descreaseProduct);

    app.route('/v1/product-level/:productName')
        .delete(productController.deleteProduct)
        .get(productController.checkProduct);
};

module.exports = { routes };
