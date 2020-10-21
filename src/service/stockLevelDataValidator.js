const STOCK_LEVEL_CHAIN = [validateEmpty, validateProductNameProperty, validateNameLength, validateQuantity];

const NAME_MIN = 3;
const NAME_MAX = 60;

const QUANTITY_MIN = 0;
const QUANTITY_MAX = 20000000;

function validateStockLevelData(stockLevelData) {
    STOCK_LEVEL_CHAIN.forEach((validate) => validate(stockLevelData));
}

function validateEmpty(stockLevelData) {
    if (!stockLevelData) throw new Error('stockLevelData cannot be null.');
}

function validateProductNameProperty(stockLevelData) {
    if (!stockLevelData.productName) throw new Error('stockLevelData must have a productName.');
}

function validateNameLength(stockLevelData) {
    const name = stockLevelData.productName;
    if (!name || !(name.length >= NAME_MIN && name.length <= NAME_MAX)) throw new Error('ProductName length must be between 3 and 60.');
}

function validateQuantity(stockLevelData) {
    validateQuantityNumber(stockLevelData.quantity)
}

function validateProdutName(productName) {
    if (!productName || productName === '') throw new Error('Product name cannot be null/empty.');
}

function validateQuantityNumber(quantity) {
    if (!quantity || !(quantity >= QUANTITY_MIN && quantity <= QUANTITY_MAX)) throw new Error('Quantity must be between 0 and 20_000_000.');
}

module.exports = { validateStockLevelData, validateProdutName, validateQuantityNumber };
