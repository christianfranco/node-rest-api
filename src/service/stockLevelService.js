const stockLevelRepository = require('../repository/stockLevelRepository');
const stockLevelDataValidor = require('../service/stockLevelDataValidator');
const {logger} = require("../../configuration/loggerConfig");

/**
 * Creates a new stock level
 * 
 * @param {json} stockLevelData 
 * @returns StockLevel
 */
function createStockLevel(stockLevelData) {
    stockLevelDataValidor.validateStockLevelData(stockLevelData);

    return stockLevelRepository.save(stockLevelData)
        .catch(err => {
            logger.error(err);
            throw new Error(`Error to save stock ${stockLevelData}`);
        });
}

function deleteStockLevel(productName) {
    stockLevelDataValidor.validateProdutName(productName);

    return stockLevelRepository.deleteProduct(productName)
        .catch(err => {
            logger.error(err);
            throw new Error(`Error to delete stock ${productName}`);
        });
}

function updateQuantity(productName, decreaseQuantity) {
    stockLevelDataValidor.validateProdutName(productName);
    stockLevelDataValidor.validateQuantityNumber(decreaseQuantity);

    return stockLevelRepository.findByName(productName)
        .then(stockLevel => {

            const newQuantity = stockLevel.quantity - decreaseQuantity;

            if (newQuantity < 0) {
                throw new Error("Decrease quantity invalid");
            }

            return stockLevelRepository.update(productName, newQuantity)
                .catch(err => {
                    logger.error(err);
                    throw new Error(`Error to update stock level :${productName}`);
                });
        })
        .catch(err => {
            logger.error(err);
            throw new Error(`Error to find stock level :${productName}`);
        });
}

module.exports = { createStockLevel, deleteStockLevel, updateQuantity };