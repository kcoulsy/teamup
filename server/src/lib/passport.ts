import { User } from '@prisma/client';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { authLogin } from '../services/auth.service';
import { Express } from 'express';
import session from 'express-session';

const setupPassport = (app: Express) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      cookie: { secure: process.env.NODE_ENV === 'production' },
      saveUninitialized: false,
      resave: false,
    })
  );
  app.use(passport.session());

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

  app.use(passport.session());
};

export default setupPassport;
