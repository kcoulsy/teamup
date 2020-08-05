import User from '../models/user.model';
import * as express from 'express';
import { RES_AUTH_HEADER } from '../constants/auth'
import { NextFunction } from 'express';

const Authenticate = (req : express.Request, res : express.Response, next : NextFunction) => {
    const token = req.header(RES_AUTH_HEADER);

    User.findByToken(token)
        .then((user) => {
            if (!user) return Promise.reject();

            req.user = user;
            req.token = token;
            next();
        })
        .catch((err) => res.status(401).send());
};

module.exports = { Authenticate };
