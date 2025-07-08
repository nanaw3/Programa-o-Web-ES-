import { PrismaClient } from '@prisma/client';
import { CreateMajorInput } from '../types/Major';

const prisma = new PrismaClient();

export const getAllMajors = async () => {
  return prisma.major.findMany();
};

export const getMajorById = async (id: string) => {
  return prisma.major.findUnique({ where: { id } });
};

export const createMajor = async (data: CreateMajorInput) => {
  return prisma.major.create({ data });
};

export const updateMajor = async (id: string, data: Partial<CreateMajorInput>) => {
  return prisma.major.update({ where: { id }, data });
};

export const deleteMajor = async (id: string) => {
  return prisma.major.delete({ where: { id } });
};