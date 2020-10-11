const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

function connectDB() {
    if (mongoose.connection.readyState === 1) {
        console.info("MongoDB already connected...");
        return;
    }

    return mongoose.connect('mongodb://localhost/stockIT', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
}

function clearDB() {
   return mongoose.connection.db.dropDatabase();
}

function disconnectDB() {
    if (mongoose.connection.readyState === 0) {
        console.info("MongoDB already disconnected...");
        return;
    }

    return mongoose.disconnect();
}

module.exports = {connectDB, disconnectDB, clearDB};
