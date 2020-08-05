import request from 'supertest';
import app from '../../../app';
import User from '../../../models/user.model';
import { RES_AUTH_HEADER, MIN_USER_LEN, MIN_PASSWORD_LEN } from '../../../constants/auth';

import containsNumber from '../../../utils/containsNumber';
import isValidEmail from '../../../utils/isValidEmail';

const userOne = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password1',
};

beforeEach(async () => {
    await User.deleteMany({});
    const user = await new User({ ...userOne }).save();
    await user.createAuthToken();
});

describe('POST /api/auth/login', () => {
    it('should log in with correct credentials and return token', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                username: userOne.username,
                password: userOne.password,
            })
            .expect(200)
            .expect((res: request.Response) => {
                expect(res.body.token).not.toBeUndefined();
            });
    });
    it('should not log in without correct credentials', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                username: 'usershouldnotexist',
                password: 'password',
            })
            .expect(400);
    });
});

describe('POST /api/auth/register', () => {
    it('should register user if valid values passed and no user exists', async () => {
        const newUser = {
            username: 'thisisatest',
            email: 'thisisanemail@gmail.com',
            password: 'password123',
            confirm: 'password123',
        };
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUser })
            .expect(200)
            .expect((res) => {
                expect(res.body.username).toBe(newUser.username);
            });
    });
    it('should not register user if user already exists - username', async () => {
        const newUser = {
            username: 'thisisatest',
            email: 'thisisanemail@gmail.com',
            password: 'password123',
            confirm: 'password123',
        };
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUser, username: userOne.username })
            .expect(400);
    });
    it('should not register user if user already exists - email', async () => {
        const newUser = {
            username: 'thisisatest',
            email: 'thisisanemail@gmail.com',
            password: 'password123',
            confirm: 'password123',
        };
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUser, email: userOne.email })
            .expect(400);
    });
    it('should not register user if username is not valid', async () => {
        // TESTING USERNAME TOO SHORT
        const newUser = {
            username: 'a',
            email: 'thisisanemail@gmail.com',
            password: 'password123',
            confirm: 'password123',
        };
        expect(newUser.username.length < MIN_USER_LEN).toBeTruthy();

        await request(app)
            .post('/api/auth/register')
            .send({ ...newUser })
            .expect(400);
    });
    it('should not register user if email is not valid', async () => {
        // TESTING EMAIL NOT REAL
        const newUser = {
            username: 'thisisatest',
            email: 'NOTANEMAIL',
            password: 'password123',
            confirm: 'password123',
        };
        expect(isValidEmail(newUser.email)).toBeFalsy();
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUser })
            .expect(400);
    });
    it('should not register user if passwords are not valid', async () => {
        // PASSWORDS NOT VALID - TOO SHORT
        const newUserOne = {
            username: 'thisisatest',
            email: 'testemail@email.com',
            password: 'abc',
            confirm: 'abc',
        };
        expect(newUserOne.password.length < MIN_PASSWORD_LEN).toBeTruthy();
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUserOne })
            .expect(400);

        // PASSWORDS NOT VALID - NO NUMBER
        const newUserTwo = {
            username: 'thisisatest',
            email: 'testemail@email.com',
            password: 'abcdefchi',
            confirm: 'abcdefchi',
        };

        expect(containsNumber(newUserTwo.password)).toBeFalsy();

        await request(app)
            .post('/api/auth/register')
            .send({ ...newUserTwo })
            .expect(400);

        // PASSWORDS NOT MATCHING
        const newUserThree = {
            username: 'a',
            email: 'testemail@email.com',
            password: 'password123',
            confirm: 'dontmatch',
        };

        expect(newUserThree.password).not.toBe(newUserThree.confirm);

        await request(app)
            .post('/api/auth/register')
            .send({ ...newUserThree })
            .expect(400);
    });
});

describe('POST /api/auth/verify', () => {
    it('should return true if token is valid', async () => {
        const testUser = await User.findOne({ username: userOne.username });
        await request(app)
            .get('/api/auth/verify')
            .set(RES_AUTH_HEADER, testUser.tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.valid).toBeTruthy();
            });
    });

    it('should return false if token is not valid', async () => {
        await request(app)
            .get('/api/auth/verify')
            .set(RES_AUTH_HEADER, 'invalidtoken')
            .expect(200)
            .expect((res) => {
                expect(res.body.valid).toBeFalsy();
            });
    });
});
