import { z } from 'zod';

export const loginBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginBodySchema = z.infer<typeof loginBodySchema>;

export const registerBodySchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterBodySchema = z.infer<typeof registerBodySchema>;
