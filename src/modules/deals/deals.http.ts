import { Router } from 'express';
import { ensureAuth, AuthRequest } from '../../shared/middlewares/auth.js';
import { AppError } from '../../shared/errors/AppError.js';
import { dealCreateSchema, dealsQuerySchema } from './deals.schemas.js';
import { createDeal, deleteDeal, getDeal, listDeals, updateDeal } from './deals.service.js';

export const dealsRouter = Router();
dealsRouter.use(ensureAuth);

dealsRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = dealCreateSchema.parse(req.body);
    const { deal, error } = await createDeal(req.userId!, data);
    if (error) throw new AppError(error, 404);
    res.status(201).json(deal);
  } catch (e) { next(e); }
});

dealsRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const { page, perPage, q, stageId } = dealsQuerySchema.parse(req.query);
    const data = await listDeals(req.userId!, page, perPage, q, stageId);
    res.json(data);
  } catch (e) { next(e); }
});

dealsRouter.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const d = await getDeal(req.userId!, req.params.id);
    if (!d) throw new AppError('Deal not found', 404);
    res.json(d);
  } catch (e) { next(e); }
});

dealsRouter.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const data = dealCreateSchema.partial().parse(req.body);
    const updated = await updateDeal(req.userId!, req.params.id, data);
    if (!updated) throw new AppError('Deal not found', 404);
    res.json(updated);
  } catch (e) { next(e); }
});

dealsRouter.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const ok = await deleteDeal(req.userId!, req.params.id);
    if (!ok) throw new AppError('Deal not found', 404);
    res.status(204).send();
  } catch (e) { next(e); }
});
