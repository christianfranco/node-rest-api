
function buildInternalError(product, err) {
    const productName = (product && product.productName) ? product.productName : '';

    return {
        'productName': productName,
        'errorCode': 500,
        'errorMessage': err.message
    };
}

module.exports = {buildInternalError};
