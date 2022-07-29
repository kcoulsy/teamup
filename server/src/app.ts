/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
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
  // @ts-ignore
  console.log('MongoDB connection established');
});

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, './../../', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './../../', 'build', 'index.html'));
});

app.get('*', (_, res) => {
  res.redirect('/');
});

export default app;
