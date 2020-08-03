import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config/config';
import apiRouter from './routes/api';

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
    // tslint:disable-next-line
    console.log('MongoDB connection established');
});

app.use('/api', apiRouter);

export default app;
