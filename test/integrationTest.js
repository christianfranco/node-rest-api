const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

before(async () => {
    await connectDB();
});

after(async () => {
    await clearDB();
    await disconnectDB();
});

function connectDB() {
    if (mongoose.connection.readyState === 1) {
        console.info("MongoDB already connected...");
        return;
    }

    return mongoose.connect('mongodb://localhost/stockIT', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }).then(() => console.log("\n## DB connected...\n"));
}

function clearDB() {
    return mongoose.connection.db.dropDatabase();
}

function disconnectDB() {
    if (mongoose.connection.readyState === 0) {
        console.info("MongoDB already disconnected...");
        return;
    }

    return mongoose.disconnect().then(() => console.log("\n## DB disconnected...\n"));
}

module.exports = { clearDB };
