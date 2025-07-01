import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveScore: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { score } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).send('Não autenticado');
    return;
  }

  await prisma.gameSession.create({
    data: {
      userId,
      score,
    },
  });

  res.status(200).send('Score salvo');
};