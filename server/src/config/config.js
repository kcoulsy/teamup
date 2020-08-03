require('dotenv').config();

const isTestEnv = (process.env.NODE_ENV = 'test');

module.exports = {
    mongo: {
        uri: isTestEnv ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI,
    },
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
};
