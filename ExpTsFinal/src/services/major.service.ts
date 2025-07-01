import { PrismaClient } from '@prisma/client';
import { MajorCreateData } from '../types/major.types';

const prisma = new PrismaClient();

export const MajorService = {
  findAll: () => prisma.major.findMany(),
  findById: (id: number) => prisma.major.findUnique({ where: { id } }),
  create: (data: MajorCreateData) => prisma.major.create({ data }),
  delete: (id: number) => prisma.major.delete({ where: { id } })
};
