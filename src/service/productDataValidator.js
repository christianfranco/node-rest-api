const PRODUCT_LEVEL_CHAIN = [validateEmpty, validateProductNameProperty, validateNameLength, validateQuantity];

const NAME_MIN = 3;
const NAME_MAX = 60;

const QUANTITY_MIN = 0;
const QUANTITY_MAX = 20000000;

function validateProductData(productData) {
    PRODUCT_LEVEL_CHAIN.forEach((validate) => validate(productData));
}

function validateEmpty(productData) {
    if (!productData) throw new Error('productData cannot be null.');
}

function validateProductNameProperty(productData) {
    if (!productData.productName) throw new Error('productData must have a productName.');
}

function validateNameLength(productData) {
    const name = productData.productName;
    if (!name || !(name.length >= NAME_MIN && name.length <= NAME_MAX)) throw new Error('ProductName length must be between 3 and 60.');
}

function validateQuantity(productData) {
    validateQuantityNumber(productData.quantity)
}

function validateProductName(productName) {
    if (!productName || productName === '') throw new Error('Product name cannot be null/empty.');
}

function validateQuantityNumber(quantity) {
    if (!quantity || !(quantity >= QUANTITY_MIN && quantity <= QUANTITY_MAX)) throw new Error('Quantity must be between 0 and 20_000_000.');
}

module.exports = { validateProductData, validateProductName, validateQuantityNumber };
