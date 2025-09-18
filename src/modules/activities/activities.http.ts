import { Router } from 'express';
import { ensureAuth, AuthRequest } from '../../shared/middlewares/auth.js';
import { AppError } from '../../shared/errors/AppError.js';
import { activityCreateSchema, activitiesQuerySchema } from './activities.schemas.js';
import { createActivity, listActivities } from './activities.service.js';

export const activitiesRouter = Router();
activitiesRouter.use(ensureAuth);

activitiesRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = activityCreateSchema.parse(req.body);
    const act = await createActivity(req.userId!, data);
    if (!act) throw new AppError('Related entity not found', 404);
    res.status(201).json(act);
  } catch (e) { next(e); }
});

activitiesRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const { page, perPage, type } = activitiesQuerySchema.parse(req.query);
    const data = await listActivities(req.userId!, page, perPage, type);
    res.json(data);
  } catch (e) { next(e); }
});
