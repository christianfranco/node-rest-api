const stockLevelRepository = require('../repository/stockLevelRepository');
const stockLevelDataValidor = require('../service/stockLevelDataValidator');

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
            console.error(err);
            throw new Error(`Error to save stock ${stockLevelData}`);
        });
}

module.exports = { createStockLevel };