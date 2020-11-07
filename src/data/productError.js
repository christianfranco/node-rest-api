function buildInternalError(product, err) {
    const productName = (product && product.productName) ? product.productName : '';
    const message  = err.message;

    return {
        'productName': productName,
        'errorCode': 500,
        'errorMessage': message
    };
}

module.exports = {buildInternalError};
