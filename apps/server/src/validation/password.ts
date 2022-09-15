import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(255, 'Password must be at most 255 characters long')
  .regex(/^.*[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/^.*[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/^.*[0-9]/, 'Must contain at least one number')
  .regex(
    /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    'Must contain at least one special character'
  );
