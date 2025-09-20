import { Router } from 'express';
import { ensureAuth, AuthRequest } from '../../shared/middlewares/auth.js';
import { prisma } from '../../core/prisma.js';

export const stagesRouter = Router();
stagesRouter.use(ensureAuth);

stagesRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const stages = await prisma.stage.findMany({
      where: { pipeline: { ownerId: req.userId! } },
      orderBy: [{ pipelineId: 'asc' }, { order: 'asc' }],
      include: { pipeline: { select: { id: true, name: true } } },
    });
    res.json(stages);
  } catch (e) { next(e); }
});
