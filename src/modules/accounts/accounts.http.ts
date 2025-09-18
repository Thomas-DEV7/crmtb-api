import { Router } from 'express';
import { ensureAuth, AuthRequest } from '../../shared/middlewares/auth.js';
import { accountCreateSchema, paginationQuerySchema } from './accounts.schemas.js';
import { AppError } from '../../shared/errors/AppError.js';
import { createAccount, deleteAccount, getAccount, listAccounts, updateAccount } from './accounts.service.js';

export const accountsRouter = Router();
accountsRouter.use(ensureAuth);

accountsRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = accountCreateSchema.parse(req.body);
    const account = await createAccount(req.userId!, data);
    res.status(201).json(account);
  } catch (e) { next(e); }
});

accountsRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const { page, perPage } = paginationQuerySchema.parse(req.query);
    const data = await listAccounts(req.userId!, page, perPage);
    res.json(data);
  } catch (e) { next(e); }
});

accountsRouter.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const account = await getAccount(req.userId!, req.params.id);
    if (!account) throw new AppError('Account not found', 404);
    res.json(account);
  } catch (e) { next(e); }
});

accountsRouter.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const data = accountCreateSchema.parse(req.body);
    const updated = await updateAccount(req.userId!, req.params.id, data);
    if (!updated) throw new AppError('Account not found', 404);
    res.json(updated);
  } catch (e) { next(e); }
});

accountsRouter.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const ok = await deleteAccount(req.userId!, req.params.id);
    if (!ok) throw new AppError('Account not found', 404);
    res.status(204).send();
  } catch (e) { next(e); }
});
