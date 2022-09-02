import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './api/router';
import handleErrors from './middleware/handleErrors';
import setupPassport from './middleware/setupPassport';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:8000',
    credentials: true,
  })
);

app.use(express.json());

setupPassport(app);

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, './../../', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './../../', 'build', 'index.html'));
});

app.get('*', (_, res) => {
  res.redirect('/');
});

app.use(handleErrors);

export default app;
