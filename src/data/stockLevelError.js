
function buildInternalError(stockLevel, err) {
    const productName = (stockLevel && stockLevel.productName) ? stockLevel.productName : '';

    return {
        productName: productName,
        errorCode: 500,
        errorMessage: err.message
    }
}

module.exports = {buildInternalError};
