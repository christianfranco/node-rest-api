import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

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

APP.get('/', (req, res) =>
    res.send(`Node and Express server runnig on port ${PORT}`)
);

APP.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);