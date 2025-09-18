import { prisma } from '../../core/prisma.js';

export async function createAccount(ownerId: string, data: { name: string; website?: string; phone?: string }) {
  return prisma.account.create({ data: { ...data, ownerId } });
}

export async function listAccounts(ownerId: string, page: number, perPage: number) {
  const [items, total] = await Promise.all([
    prisma.account.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.account.count({ where: { ownerId } }),
  ]);
  return { items, page, perPage, total };
}

export async function getAccount(ownerId: string, id: string) {
  return prisma.account.findFirst({ where: { id, ownerId } });
}

export async function updateAccount(ownerId: string, id: string, data: { name: string; website?: string; phone?: string }) {
  const exists = await getAccount(ownerId, id);
  if (!exists) return null;
  return prisma.account.update({ where: { id }, data });
}

export async function deleteAccount(ownerId: string, id: string) {
  const result = await prisma.account.deleteMany({ where: { id, ownerId } });
  return result.count > 0;
}
