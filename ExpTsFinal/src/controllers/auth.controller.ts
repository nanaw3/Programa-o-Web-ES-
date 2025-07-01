
declare module 'express-session' {
  interface SessionData {
    userId: number;
    userName: string;
  }
}
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export const AuthController = {
  loginForm: (_req: Request, res: Response) => {
    res.render('auth/login', { title: 'Login' });
  },


  login: async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return res.render('auth/login', { error: 'Credenciais inválidas' });
  }

  req.session.userId = user.id;
  res.redirect('/jogo/index.html'); // vai pro jogo após login
},


  logout: (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};
