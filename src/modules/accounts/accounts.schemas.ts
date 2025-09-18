import { z } from 'zod';

export const accountCreateSchema = z.object({
  name: z.string().min(2),
  website: z.string().url().optional().or(z.literal('').transform(() => undefined)),
  phone: z.string().min(6).optional(),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
});
