const productRepository = require('../repository/productRepository');
const productDataValidor = require('./productDataValidator');
const productInfo = require('../data/productInfo')

/**
 * Creates a new product level
 * 
 * @param {json} productData 
 * @returns Product
 */
function createProduct(productData) {
    productDataValidor.validateProductData(productData);

    return productRepository.save(productData);
}

/**
 * Checks a product level
 * 
 * @param {string} productName 
 */
function checkProduct(productName) {
    productDataValidor.validateProductName(productName);

    return productRepository.findByName(productName)
        .then(product => productInfo.mapProductInfo(product));
    }

/**
 * Delete a product level by product name
 * 
 * @param {string} productName 
 */
function deleteProduct(productName) {
    productDataValidor.validateProductName(productName);

    return productRepository.deleteProduct(productName);
}

/**
 * Update a quantity for an existing product level
 * 
 * @param {string} productName product name
 * @param {number} decreaseQuantity quantity to be decreased
 */
function updateQuantity(productName, decreaseQuantity) {
    productDataValidor.validateProductName(productName);
    productDataValidor.validateQuantityNumber(decreaseQuantity);

    return productRepository.findByName(productName)
        .then(product => calculateQuantity(product, decreaseQuantity, productName));
}

function calculateQuantity(product, decreaseQuantity, productName) {
    const newQuantity = product.quantity - decreaseQuantity;

    if (newQuantity < 0) {
        throw new Error("Decrease quantity invalid");
    }

    return productRepository.update(productName, newQuantity);
}

module.exports = { createProduct, deleteProduct, updateQuantity, checkProduct };
