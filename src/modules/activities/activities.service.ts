import { prisma } from '../../core/prisma.js';

export async function createActivity(ownerId: string, data: any) {
  // valida ownership dos vínculos
  const checks: Array<Promise<number>> = [];
  if (data.accountId) checks.push(prisma.account.count({ where: { id: data.accountId, ownerId } }));
  if (data.contactId) checks.push(prisma.contact.count({ where: { id: data.contactId, ownerId } }));
  if (data.dealId)    checks.push(prisma.deal.count({ where: { id: data.dealId, ownerId } }));

  const results = await Promise.all(checks);
  if (results.some((n) => n === 0)) return null;

  return prisma.activity.create({ data: { ...data, ownerId } });
}

export async function listActivities(ownerId: string, page: number, perPage: number, type?: string) {
  const where: any = { ownerId };
  if (type) where.type = type;
  const [items, total] = await Promise.all([
    prisma.activity.findMany({
      where, orderBy: { at: 'desc' }, skip: (page - 1) * perPage, take: perPage,
      include: { account: true, contact: true, deal: true },
    }),
    prisma.activity.count({ where }),
  ]);
  return { items, page, perPage, total };
}
