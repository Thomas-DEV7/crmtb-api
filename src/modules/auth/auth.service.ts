import { prisma } from '../../core/prisma.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.ts';
import { AppError } from '../../shared/errors/AppError.ts';

export async function signUp(input: { name: string; email: string; password: string }) {
  const exists = await prisma.user.findUnique({ where: { email: input.email } });
  if (exists) throw new AppError('Email already in use', 409);
  const hash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, password: hash },
    select: { id: true, name: true, email: true },
  });
  return user;
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new AppError('Invalid credentials', 401);
  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) throw new AppError('Invalid credentials', 401);
  const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: '7d' });
  return { token };
}
