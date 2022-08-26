import { z } from 'zod';

export const createTeamBodySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateTeamBodySchema = z.infer<typeof createTeamBodySchema>;

export const updateTeamBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type UpdateTeamBodySchema = z.infer<typeof updateTeamBodySchema>;
