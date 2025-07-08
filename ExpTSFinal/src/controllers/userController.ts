import { Request, Response } from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcrypt';
import * as majorService from '../services/majorService';
import { Prisma, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const list = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users); 
};

export const showUser = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).send('Usuário não encontrado');
  res.render('users/detail', { user });
};


export const createUser = async (req: Request, res: Response) => {
  const { full_name, email, password, major_id } = req.body;
  await userService.createUser({ full_name, email, password, major_id });
  res.redirect('/users');
};

export const updateUser = async (req: Request, res: Response) => {
  const { full_name, email, password, major_id } = req.body;
  await userService.createUser({ full_name, email, password, major_id });
  res.redirect('/users');
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.redirect('/users');
};
//novo

export const showRegisterForm = async (req: Request, res: Response) => {
  const majors = await majorService.getAllMajors();
  res.render('users/register', { majors });
};

export const registerUser = async (req: Request, res: Response) => {
  const { full_name, email, password, confirm_password, major_id } = req.body;

  if (password !== confirm_password) {
    return res.send('As senhas não coincidem.');
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    await userService.createUser({ full_name, email, password: hash, major_id });
    res.redirect('/login');
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.send('Erro: este e-mail já esta cadastrado.');
    }
    return res.status(500).send('Erro ao registrar usuário.');

  }

};

export const showLoginForm = (req: Request, res: Response) => {
  res.render('users/login');
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.send('Usuário não encontrado');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Senha incorreta');

  req.session.user = {
    id: user.id,
    full_name: user.full_name,
    email: user.email
  };

  res.redirect('/');
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

export const showEditProfile = async (req: Request, res: Response) => {
  const user = req.session.user;
  const majors = await majorService.getAllMajors();
  const existingUser = await userService.getUserById(user!.id);
  res.render('users/edit', { user: existingUser, majors });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { full_name, email, major_id } = req.body;
  await userService.updateUser(req.session.user!.id, { full_name, email, major_id });


  req.session.user!.full_name = full_name;
  req.session.user!.email = email;

  res.redirect('/');
};

export const showPasswordForm = (req: Request, res: Response) => {
  res.render('users/password');
};

export const updatePassword = async (req: Request, res: Response) => {
  const { current_password, new_password, confirm_password } = req.body;

  if (new_password !== confirm_password) {
    return res.send('Nova senha e confirmação não coincidem.');
  }

  const user = await userService.getUserById(req.session.user!.id);
  const match = await bcrypt.compare(current_password, user!.password);

  if (!match) return res.send('Senha atual incorreta.');

  const hash = await bcrypt.hash(new_password, 10);
  await userService.updateUser(user!.id, { password: hash });

  res.redirect('/');
};
