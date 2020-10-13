const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/route/routes");

const app = express();
const port = 4000;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const dbConnection = mongoose.connect('mongodb://localhost/stockDEV', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected..."));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.routes(app);

const server = app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);

function stop() {
    server.close();
}

module.exports = { app, stop, dbConnection }
