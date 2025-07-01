import { PrismaClient } from '@prisma/client';
import { UserCreateData } from '../types/user.types';

const prisma = new PrismaClient();

export const UserService = {
  findAll: () => prisma.user.findMany({ include: { major: true } }),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: UserCreateData) => prisma.user.create({ data }),
  delete: (id: number) => prisma.user.delete({ where: { id } })
};
