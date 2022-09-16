import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const serverEnvSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.number(),
  DATABASE_URL: z.string(),
  DATABASE_URL_TEST: z.string(),
  SESSION_SECRET: z.string(),
});

const serverEnv: z.infer<typeof serverEnvSchema> = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.SERVER_PORT || '5000'),
  DATABASE_URL: process.env.SERVER_DATABASE_URL,
  DATABASE_URL_TEST: process.env.SERVER_DATABASE_URL_TEST,
  SESSION_SECRET: process.env.SERVER_SESSION_SECRET,
});

export default serverEnv;
