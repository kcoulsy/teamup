/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import apiRouter from './api/router';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { authLogin } from './services/auth.service';
import session from 'express-session';
import { User } from '@prisma/client';
import handleErrors from './middleware/handleErrors';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:8000',
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { secure: process.env.NODE_ENV === 'production' },
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.session());

// TODO move all this passport shit somewhere else
passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    authLogin(username, password)
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        cb(err, false);
      });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: User, done) {
  done(null, user);
});

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
