const productService = require('../service/productService');
const { buildInternalError } = require('../data/productError');
const { logger } = require("../../configuration/loggerConfig");

function createProduct(req, res) {
    const product = req.body;

    try {
        productService.createProduct(product)
            .then(product => res.status(200).json(product))
            .catch(err => sendHttpError(err, res, product));
    } catch (err) {
        sendHttpError(err, res, product);
    }
}

function descreaseProduct(req, res) {
    const product = req.body;
    try {
        productService.updateQuantity(product.productName, product.quantity)
            .then(product => res.status(200).json(product))
            .catch(err => sendHttpError(err, res, product));
    } catch (err) {
        sendHttpError(err, res, product);
    }
}

function deleteProduct(req, res) {
    const productName = req.params.productName;

    try {
        productService.deleteProduct(productName)
            .then(() => res.status(200).send())
            .catch(err => sendHttpError(err, res, productName));
    } catch (err) {
        sendHttpError(err, res, productName);
    }
}

function checkProduct(req, res) {
    const productName = req.params.productName;

    try {
        productService.checkProduct(productName)
            .then(product => res.status(200).send(product))
            .catch(err => sendHttpError(err, res, productName));
    } catch (err) {
        sendHttpError(err, res, productName);
    }
}

function sendHttpError(err, res, product) {
    logger.error(err);
    res.status(500).send(buildInternalError(product, err));
}

module.exports = { createProduct, descreaseProduct, checkProduct, deleteProduct };
