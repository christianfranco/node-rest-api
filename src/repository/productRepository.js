const mongoose = require("mongoose");
const { ProductSchema, buildProduct, buildProductByName } = require("../model/product");

const Product = mongoose.model("Product", ProductSchema);

/**
 * Saves new Product based on JSON object.
 * 
 * @param {json} productData new Product
 * @returns Promise<Product>
 */
function save(productData) {
    const newProduct = new Product(productData);

    return newProduct.save();
}

/**
 * Update the product quantity 
 * 
 * @param {string} name The product name of a existing Product
 * @param {number} quantity new quantity
 * @returns Promise<Product>
 */
function update(name, quantity) {
    const filter = buildProductByName(name);
    const toUpdate = buildProduct(name, quantity, Date.now());

    return Product.findOneAndUpdate(filter, toUpdate, { new: true });
}

/**
 * Finds a Product by product name
 * 
 * @param {string} name product name
 * @returns Promise<Product>
 */
function findByName(name) {
    const filter = buildProductByName(name);

    return Product.findOne(filter);
}

/**
 * Deletes a Product Level by product name.
 * 
 * @param {string} name  product name
 * @returns Promise<Product>
 */
function deleteProduct(name) {
    const filter = buildProductByName(name);
    return Product.deleteMany(filter);
}

module.exports = { save, update, findByName, deleteProduct };
