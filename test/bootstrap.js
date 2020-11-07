const app = require('../app');
const { ProductSchema } = require("../src/model/product");
const mongoose = require("mongoose");
const Product = mongoose.model("Product", ProductSchema);
const { logger } = require("../configuration/loggerConfig");

before((done) => {
    app.dbConnection.then(() => {
        clearDB();
        done();
    });
});

after(async () => {
    await disconnectDB();
    app.stop();
});

function disconnectDB() {
    if (mongoose.connection.readyState === 0) {
        logger.info("\n##MongoDB already disconnected...");
        return;
    }

    return mongoose.disconnect().then(() => logger.debug("\n## MongoDB disconnected...\n"));
}

function clearDB() {
    return Product.deleteMany({}, () => logger.info("\n##MongoDB :: product records removed..."));
}