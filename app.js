const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./src/route/productRoutes");
const config = require("./configuration/config");
const app = express();
const environment = process.env.NODE_ENV;
const {logger} = require("./configuration/loggerConfig");

logger.info("environment: " + environment);

const port = config[environment].PORT;
const dbURL = config[environment].DB_URL;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const dbConnection = mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => logger.debug("MongoDB connected..."));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

productRoutes.routes(app);

const server = app.listen(port, () =>
    logger.debug(`Server running on port ${port}`)
);

function stop() {
    server.close();
}

module.exports = { app, stop, dbConnection }
