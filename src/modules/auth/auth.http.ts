import { Router } from 'express';
import { signUpSchema, loginSchema } from './auth.schemas.js';
import { signUp, login } from './auth.service.js';

export const authRouter = Router();

authRouter.post('/signup', async (req, res, next) => {
  try {
    const data = signUpSchema.parse(req.body);
    const user = await signUp(data);
    res.status(201).json(user);
  } catch (e) { next(e); }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const out = await login(data);
    res.json(out);
  } catch (e) { next(e); }
});
