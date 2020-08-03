const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/user.model');

const userOne = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password1',
};

beforeEach(async () => {
    await User.deleteMany();
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
            .expect((res) => {
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
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUser })
            .expect(400);
    });
    it('should not register user if passwords are not valid', async () => {
        // PASSWORDS NOT VALID - TOO SHORT
        const newUserOne = {
            username: 'thisisatest',
            email: 'NOTANEMAIL',
            password: 'abc',
            confirm: 'abc',
        };
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUserOne })
            .expect(400);

        // PASSWORDS NOT VALID - NO NUMBER
        const newUserTwo = {
            username: 'thisisatest',
            email: 'NOTANEMAIL',
            password: 'abcdefchi',
            confirm: 'abcdefchi',
        };
        await request(app)
            .post('/api/auth/register')
            .send({ ...newUserTwo })
            .expect(400);

        // PASSWORDS NOT MATCHING
        const newUserThree = {
            username: 'a',
            email: 'NOTANEMAIL',
            password: 'password123',
            confirm: 'dontmatch',
        };
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
            .set('x-auth', testUser.tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.valid).toBeTruthy();
            });
    });

    it('should return false if token is not valid', async () => {
        await request(app)
            .get('/api/auth/verify')
            .set('x-auth', 'invalidtoken')
            .expect(200)
            .expect((res) => {
                expect(res.body.valid).toBeFalsy();
            });
    });
});
