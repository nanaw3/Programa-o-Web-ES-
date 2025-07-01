
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const GameService = {
  save: (userId: number, score: number) => {
    return prisma.gameSession.create({
      data: {
        userId,
        score
      }
    });
  }
};
