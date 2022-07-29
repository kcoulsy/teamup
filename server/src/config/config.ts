import dotenv from 'dotenv';

dotenv.config();

const isTestEnv = (process.env.NODE_ENV = 'test');

interface Config {
  mongo: {
    uri: string;
  };
  port: number;
  jwtSecret: string;
}

const config: Config = {
  mongo: {
    uri: isTestEnv ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI,
  },
  port: parseInt(process.env.PORT, 10),
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
