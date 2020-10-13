/**
 * Supported States of a Stock Level Quantity.
 */
const STOCK_AVAILABILITY = {
    OUT: "OUT",
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
}

/**
 * Maps a StockLevel to a StockLevelInfo
 * 
 * @param {StockLevel} stockLevel enity to be mapped
 */
function mapStockLevelInfo(stockLevel) {
    return {
        "stockLevelAvailability": calculateAvailability(stockLevel['quantity']),
        "lastUpdate": stockLevel['lastUpdate']
    };
}

function calculateAvailability(quantity) {
    let level;

    switch (true) {
        case (quantity <= 0):
            level = STOCK_AVAILABILITY.OUT;
            break;
        case (quantity <= 5):
            level = STOCK_AVAILABILITY.LOW;
            break;
        case (quantity <= 15):
            level = STOCK_AVAILABILITY.MEDIUM;
            break;
        default:
            level = STOCK_AVAILABILITY.HIGH;
    }

    return level;
}

module.exports = { STOCK_AVAILABILITY, mapStockLevelInfo };
