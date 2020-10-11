const CHAIN = [validateEmpty, validateProductNameProperty, validateNameLength, validateQuantity];

function validateStockLevelData(stockLevelData) {
    CHAIN.forEach((validate) => validate(stockLevelData));
}

function validateEmpty(stockLevelData) {
    if (!stockLevelData) throw new Error('stockLevelData cannot be null.');
}

function validateProductNameProperty(stockLevelData) {
    if (!stockLevelData.productName) throw new Error('stockLevelData must have a productName.');
}

function validateNameLength(stockLevelData) {
    var name = stockLevelData.productName;
    if (!name || !(name.length >= 3 && name.length <= 60)) throw new Error('ProductName length must be between 3 and 60.');
}

function validateQuantity(stockLevelData) {
    var quantity = stockLevelData.quantity;
    if (!quantity || !(quantity >= 0 && quantity <= 20000000)) throw new Error('Quantity must be between 0 and 20_000_000.');
}

module.exports = { validateStockLevelData };
