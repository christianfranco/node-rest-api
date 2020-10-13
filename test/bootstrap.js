const app = require('../app');

const mongoose = require("mongoose");

before((done) => {
    app.dbConnection.then(() => done());
});

beforeEach(async () => {
    await clearDB();
});

after(async () => {
    await disconnectDB();
    app.stop();
});

function disconnectDB() {
    if (mongoose.connection.readyState === 0) {
        console.info("MongoDB already disconnected...");
        return;
    }

    return mongoose.disconnect().then(() => console.log("\n## DB disconnected...\n"));
}

function clearDB() {
    return mongoose.connection.db.dropDatabase();
}