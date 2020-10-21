const app = require('../app');
const mongoose = require("mongoose");
const {logger} = require("../configuration/loggerConfig");

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
        logger.info("MongoDB already disconnected...");
        return;
    }

    return mongoose.disconnect().then(() => logger.debug("\n## DB disconnected...\n"));
}

function clearDB() {
    return mongoose.connection.db.dropDatabase();
}