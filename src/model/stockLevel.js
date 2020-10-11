const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockLevelSchema = new Schema({
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

const StockLevel = mongoose.model("StockLevel", StockLevelSchema);

function buildStockLevel(name, quantity, lastUpdate) {
    return {
        "productName": name,
        "quantity": quantity,
        "lastUpdate": lastUpdate
    }
}

function buildStockLevelByName(name) {
    return {
        "productName": name
    }
}

module.exports = {
    StockLevel: StockLevel,
    buildStockLevel,
    buildStockLevelByName
}
