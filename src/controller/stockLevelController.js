const stockLevelService = require('../service/stockLevelService');
const { buildInternalError } = require('../data/stockLevelError');

function createStockLevel(req, res) {
    const stockLevel = req.body;

    try {
        stockLevelService.createStockLevel(stockLevel)
            .then(stock => {
                res.status(200).json(stock);
            })
            .catch(err => {
                res.status(500).send(buildInternalError(stockLevel, err));
            });
    } catch (err) {
        res.status(500).send(buildInternalError(stockLevel, err));
    }
}

module.exports = { createStockLevel };