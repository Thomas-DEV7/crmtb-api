import { z } from 'zod';

export const dealCreateSchema = z.object({
  title: z.string().min(2),
  amount: z.coerce.number().nonnegative(),
  stageId: z.string().cuid(),
  accountId: z.string().cuid().optional(),
  contactIds: z.array(z.string().cuid()).optional(),
});

export const dealsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
  stageId: z.string().cuid().optional(),
  q: z.string().optional(),
});
