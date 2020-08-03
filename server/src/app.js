/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established');
});

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

module.exports = app;
