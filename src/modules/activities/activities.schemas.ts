import { z } from 'zod';

export const activityCreateSchema = z.object({
  type: z.enum(['CALL', 'EMAIL', 'MEETING', 'NOTE']),
  subject: z.string().min(2),
  content: z.string().optional(),
  at: z.coerce.date().optional(),
  accountId: z.string().cuid().optional(),
  contactId: z.string().cuid().optional(),
  dealId: z.string().cuid().optional(),
});

export const activitiesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
  type: z.enum(['CALL','EMAIL','MEETING','NOTE']).optional(),
});
