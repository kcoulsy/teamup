import { z } from 'zod';

const clientEnvSchema = z.object({
  BASE_URL: z.string(),
  API_PATH: z.string(),
  APP_PATH: z.string(),
});

const clientEnv: z.infer<typeof clientEnvSchema> = clientEnvSchema.parse({
  // @ts-ignore TODO silence this error
  BASE_URL: import.meta.env.VITE_BASE_URL,
  // @ts-ignore TODO silence this error
  API_PATH: import.meta.env.VITE_API_PATH,
  // @ts-ignore TODO silence this error
  APP_PATH: import.meta.env.VITE_APP_PATH,
});

export default clientEnv;
