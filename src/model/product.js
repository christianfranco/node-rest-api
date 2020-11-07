const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        unique: true,
        required: "Product name is mandatory",
        minlength: 3,
        maxlength: 60
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
        max: 20000000
    },
    cretionDate: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", ProductSchema);

function buildProduct(name, quantity, lastUpdate) {
    return {
        "productName": name,
        "quantity": quantity,
        "lastUpdate": lastUpdate
    }
}

function buildProductByName(name) {
    return {
        "productName": name
    }
}

module.exports = {
    Product: Product,
    buildProduct,
    buildProductByName
}
