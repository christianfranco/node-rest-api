const mongoose = require("mongoose");
const { StockLevelSchema, buildStockLevel, buildStockLevelByName } = require("../model/stockLevel");

const StockLevel = mongoose.model("StockLevel", StockLevelSchema);

/**
 * Saves new StockLevel based on JSON object.
 * 
 * @param {json} stockLevelData new StockLevel
 * @returns Promise<StockLevel>
 */
function save(stockLevelData) {
    const newStockLevel = new StockLevel(stockLevelData);

    return newStockLevel.save();
}

/**
 * Update the stock quantity 
 * 
 * @param {string} name The product name of a existing StockLevel
 * @param {number} quantity new quantity
 * @returns Promise<StockLevel>
 */
function update(name, quantity) {
    const filter = buildStockLevelByName(name);
    const toUpdate = buildStockLevel(name, quantity, Date.now());

    return StockLevel.findOneAndUpdate(filter, toUpdate, { new: true });
}

/**
 * Finds a StockLevel by product name
 * 
 * @param {string} name product name
 * @returns Promise<StockLevel>
 */
function findByName(name) {
    const filter = buildStockLevelByName(name);

    return StockLevel.findOne(filter);
}

module.exports = { save, update, findByName };
