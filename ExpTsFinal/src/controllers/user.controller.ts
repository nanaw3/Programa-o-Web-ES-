import { Request, Response } from 'express';
import Joi from 'joi';
import { UserService } from '../services/user.service';
import { MajorService } from '../services/major.service';
import bcrypt from 'bcrypt';


const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  majorId: Joi.number().required()
});

export const UserController = {
  list: async (_req: Request, res: Response) => {
    const users = await UserService.findAll();
    res.render('users/list', { users });
  },

  createForm: async (_req: Request, res: Response): Promise<void> => {
    const majors = await MajorService.findAll();
    res.render('users/create', { majors });
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.message);
      return 
    }
    await UserService.create(value);
    res.redirect('/users');
  },

  delete: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await UserService.delete(id);
    res.redirect('/users');
    res.status(200).end(); // sem redirect

  },

   registerForm: async (_req: Request, res: Response) => {
    const majors = await MajorService.findAll();
    res.render('users/register', { majors });
  },

  register: async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, repeatPassword, majorId } = req.body;

    // Verifica se senhas batem
    if (password !== repeatPassword) {
      res.status(400).send('Senhas não coincidem');
      return;
    }

    // Validação com Joi
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
      majorId: Joi.number().required()
    });

    const { error } = schema.validate({ name, email, password, majorId });
    if (error) {
      res.status(400).send(error.message);
      return;
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserService.create({
      name,
      email,
      password: hashedPassword,
      majorId: parseInt(majorId)
    });

    res.redirect('/users');
  }

};
