import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const RankingController = {
  ranking: async (_req: Request, res: Response) => {
    // Agrupa por usuário e pega o maior score de cada um
    const top = await prisma.gameSession.groupBy({
      by: ['userId'],
      _max: { score: true },
      orderBy: { _max: { score: 'desc' } },
      take: 10
    });

    // Para cada resultado, buscamos o nome do usuário
    const ranking = await Promise.all(
      top.map(async item => {
        const user = await prisma.user.findUnique({
          where: { id: item.userId }
        });
        return {
          name: user?.name ?? '—',
          score: item._max.score!
        };
      })
    );

    res.render('ranking', { title: 'Ranking — Top 10', ranking });
  }
};
