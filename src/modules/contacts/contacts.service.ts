import { prisma } from '../../core/prisma.js';

export async function createContact(ownerId: string, data: any) {
  // garante ownership do account (se enviado)
  if (data.accountId) {
    const acc = await prisma.account.findFirst({ where: { id: data.accountId, ownerId } });
    if (!acc) return null;
  }
  return prisma.contact.create({ data: { ...data, ownerId } });
}

export async function listContacts(ownerId: string, page: number, perPage: number, q?: string) {
  const where = {
    ownerId,
    OR: q
      ? [
          { firstName: { contains: q, mode: 'insensitive' } },
          { lastName: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } },
        ]
      : undefined,
  };
  const [items, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { account: true },
    }),
    prisma.contact.count({ where }),
  ]);
  return { items, page, perPage, total };
}

export async function getContact(ownerId: string, id: string) {
  return prisma.contact.findFirst({ where: { id, ownerId }, include: { account: true } });
}

export async function updateContact(ownerId: string, id: string, data: any) {
  // se alterar accountId, valida ownership
  if (data.accountId) {
    const acc = await prisma.account.findFirst({ where: { id: data.accountId, ownerId } });
    if (!acc) return null;
  }
  const exists = await getContact(ownerId, id);
  if (!exists) return null;
  return prisma.contact.update({ where: { id }, data });
}

export async function deleteContact(ownerId: string, id: string) {
  const result = await prisma.contact.deleteMany({ where: { id, ownerId } });
  return result.count > 0;
}
