import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const serverEnvSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.number(),
  MONGODB_URI: z.string(),
  MONGODB_URI_TEST: z.string(),
  SESSION_SECRET: z.string(),
});

const serverEnv: z.infer<typeof serverEnvSchema> = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000'),
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI_TEST: process.env.MONGODB_URI_TEST,
  SESSION_SECRET: process.env.SESSION_SECRET,
});

export default serverEnv;
