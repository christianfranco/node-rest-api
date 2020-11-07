/**
 * Supported States of a Product Level Quantity.
 */
const PRODUCT_AVAILABILITY = {
    OUT: "OUT",
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
}

/**
 * Maps a Product to a ProductInfo
 * 
 * @param {Product} product enity to be mapped
 */
function mapProductInfo(product) {
    return {
        "productName": product['productName'],
        "productAvailability": calculateAvailability(product['quantity']),
        "lastUpdate": product['lastUpdate']
    };
}

function calculateAvailability(quantity) {
    let level;

    switch (true) {
        case (quantity <= 0):
            level = PRODUCT_AVAILABILITY.OUT;
            break;
        case (quantity <= 5):
            level = PRODUCT_AVAILABILITY.LOW;
            break;
        case (quantity <= 15):
            level = PRODUCT_AVAILABILITY.MEDIUM;
            break;
        default:
            level = PRODUCT_AVAILABILITY.HIGH;
    }

    return level;
}

module.exports = { PRODUCT_AVAILABILITY, mapProductInfo };
