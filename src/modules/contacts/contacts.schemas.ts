import { z } from 'zod';

export const contactCreateSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  accountId: z.string().cuid().optional(),
});

export const contactsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
  q: z.string().optional(), // busca por nome/email
});
