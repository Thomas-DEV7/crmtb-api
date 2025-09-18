import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../src/config/env.ts';

export interface AuthRequest extends Request {
  userId?: string;
}
// @ts-ignore: express typing (we’re in ESM)
export function ensureAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
