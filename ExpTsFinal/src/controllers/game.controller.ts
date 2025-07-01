import { Request, Response } from 'express';
import { GameService } from '../services/game.service';

export const GameController = {
  jogar: (_req: Request, res: Response) => {
    res.render('game/index'); // vai carregar o jogo na view
  },

  salvarScore: async (req: Request, res: Response): Promise<void> => {
    const userId = req.session?.userId;
    const { score } = req.body;

    if (!userId || typeof score !== 'number') {
      res.status(400).json({ error: 'Dados inválidos' });
      return;
    }

    await GameService.save(userId, score);
    res.status(200).json({ success: true });
  }
 }; 