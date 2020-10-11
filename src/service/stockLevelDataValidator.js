const CHAIN = [validateEmpty];

function validateStockLevelData(stockLevelData) {
    CHAIN.forEach((validate) => validate(stockLevelData));
}

function validateEmpty(stockLevelData) {
    if (!stockLevelData || stockLevelData === '') throw new Error('stockLevelData cannot be empty.');
}

module.exports = {validateStockLevelData};