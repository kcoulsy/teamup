const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established');
});

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});