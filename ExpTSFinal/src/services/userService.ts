import { prisma } from '../lib/prisma';
import { CreateUserInput } from '../types/User';

export const getAllUsers = () => {
  return prisma.user.findMany({ include: { major: true } });
};

export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = (data: CreateUserInput) => {
  return prisma.user.create({ data });
};

export const updateUser = (id: string, data: Partial<CreateUserInput>) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

