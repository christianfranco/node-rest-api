import bodyParser from "body-parser";
import express, { Router } from "express";
import mongoose from "mongoose";
import routes from "./src/route/routes";

const APP = express();
const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/stockDEV', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then( () => console.log("MongoDB connected..."));

APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(bodyParser.json());

routes.routes(APP);

APP.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);