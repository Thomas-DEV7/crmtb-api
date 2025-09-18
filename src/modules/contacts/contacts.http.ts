import { Router } from 'express';
import { ensureAuth, AuthRequest } from '../../shared/middlewares/auth.js';
import { AppError } from '../../shared/errors/AppError.js';
import { contactCreateSchema, contactsQuerySchema } from './contacts.schemas.js';
import { createContact, deleteContact, getContact, listContacts, updateContact } from './contacts.service.js';

export const contactsRouter = Router();
contactsRouter.use(ensureAuth);

contactsRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = contactCreateSchema.parse(req.body);
    const contact = await createContact(req.userId!, data);
    if (!contact) throw new AppError('Account not found', 404);
    res.status(201).json(contact);
  } catch (e) { next(e); }
});

contactsRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const { page, perPage, q } = contactsQuerySchema.parse(req.query);
    const data = await listContacts(req.userId!, page, perPage, q);
    res.json(data);
  } catch (e) { next(e); }
});

contactsRouter.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const c = await getContact(req.userId!, req.params.id);
    if (!c) throw new AppError('Contact not found', 404);
    res.json(c);
  } catch (e) { next(e); }
});

contactsRouter.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const data = contactCreateSchema.partial().parse(req.body);
    const updated = await updateContact(req.userId!, req.params.id, data);
    if (!updated) throw new AppError('Contact not found', 404);
    res.json(updated);
  } catch (e) { next(e); }
});

contactsRouter.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const ok = await deleteContact(req.userId!, req.params.id);
    if (!ok) throw new AppError('Contact not found', 404);
    res.status(204).send();
  } catch (e) { next(e); }
});
