import { prisma } from '../../core/prisma.js';

export async function createDeal(ownerId: string, data: {
  title: string; amount: number; stageId: string; accountId?: string; contactIds?: string[];
}) {
  // valida stage ownership
  const stage = await prisma.stage.findFirst({ where: { id: data.stageId, pipeline: { ownerId } } });
  if (!stage) return { error: 'Stage not found' };

  // valida account ownership
  if (data.accountId) {
    const acc = await prisma.account.findFirst({ where: { id: data.accountId, ownerId } });
    if (!acc) return { error: 'Account not found' };
  }

  // valida contacts ownership
  if (data.contactIds?.length) {
    const cnt = await prisma.contact.count({ where: { id: { in: data.contactIds }, ownerId } });
    if (cnt !== data.contactIds.length) return { error: 'Some contacts not found' };
  }

  const deal = await prisma.deal.create({
    data: {
      title: data.title,
      amount: data.amount,
      stageId: data.stageId,
      ownerId,
      accountId: data.accountId,
      contacts: data.contactIds ? { connect: data.contactIds.map(id => ({ id })) } : undefined,
    },
    include: { stage: { include: { pipeline: true } }, account: true, contacts: true },
  });
  return { deal };
}

export async function listDeals(ownerId: string, page: number, perPage: number, q?: string, stageId?: string) {
  const where: any = { ownerId };
  if (q) where.title = { contains: q, mode: 'insensitive' };
  if (stageId) where.stageId = stageId;

  const [items, total] = await Promise.all([
    prisma.deal.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { stage: true, account: true, contacts: true },
    }),
    prisma.deal.count({ where }),
  ]);
  return { items, page, perPage, total };
}

export async function getDeal(ownerId: string, id: string) {
  return prisma.deal.findFirst({
    where: { id, ownerId },
    include: { stage: { include: { pipeline: true } }, account: true, contacts: true },
  });
}

export async function updateDeal(ownerId: string, id: string, data: any) {
  const exists = await getDeal(ownerId, id);
  if (!exists) return null;

  // mover de stage? valida ownership
  if (data.stageId) {
    const st = await prisma.stage.findFirst({ where: { id: data.stageId, pipeline: { ownerId } } });
    if (!st) return null;
  }
  // trocar account? valida ownership
  if (data.accountId) {
    const acc = await prisma.account.findFirst({ where: { id: data.accountId, ownerId } });
    if (!acc) return null;
  }

  return prisma.deal.update({
    where: { id },
    data: {
      title: data.title,
      amount: data.amount,
      stageId: data.stageId,
      accountId: data.accountId,
    },
    include: { stage: true, account: true, contacts: true },
  });
}

export async function deleteDeal(ownerId: string, id: string) {
  const result = await prisma.deal.deleteMany({ where: { id, ownerId } });
  return result.count > 0;
}
