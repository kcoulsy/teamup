import { z } from 'zod';

export const getProjectsQuerySchema = z.object({
  teamId: z.string().optional(),
});

export type GetProjectsQuery = z.infer<typeof getProjectsQuerySchema>;

export const createProjectBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  teamId: z.string().optional(),
});

export type CreateProjectBodySchemaType = z.infer<
  typeof createProjectBodySchema
>;
