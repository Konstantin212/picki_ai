import { z } from 'zod';

/**
 * User profile form validation schema
 */
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
});

/**
 * User preferences schema
 */
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  language: z.enum(['en', 'de', 'uk']).default('en'),
  notifications: z
    .object({
      email: z.boolean().default(true),
      push: z.boolean().default(false),
    })
    .default({}),
});
