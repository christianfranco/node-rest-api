const stockLevelService = require('../service/stockLevelService');
const { buildInternalError } = require('../data/stockLevelError');
const { logger } = require("../../configuration/loggerConfig");

function createStockLevel(req, res) {
    const stockLevel = req.body;

    try {
        stockLevelService.createStockLevel(stockLevel)
            .then(stock => {
                res.status(200).json(stock);
            })
            .catch(err => {
                error(err, res, stockLevel);
            });
    } catch (err) {
        error(err, res, stockLevel);
    }
}

function descreaseStockLevel(req, res) {
    const stockLevel = req.body;

    try {
        stockLevelService.updateQuantity(stockLevel.productName, stockLevel.quantity)
            .then(stock => {
                logger.silly(`updated: ${stock}`);
                res.status(200).json(stock);
            })
            .catch(err => {
                error(err, res, stockLevel);
            });
    } catch (err) {
        error(err, res, stockLevel);
    }
}

function error(err, res, stockLevel) {
    logger.error(err);
    res.status(500).send(buildInternalError(stockLevel, err));
}

module.exports = { createStockLevel, descreaseStockLevel };
