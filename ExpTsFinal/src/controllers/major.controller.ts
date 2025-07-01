import { Request, Response } from 'express';
import Joi from 'joi';
import { MajorService } from '../services/major.service';

const majorSchema = Joi.object({
  name: Joi.string().min(2).required()
});

export const MajorController = {
  list: async (_req: Request, res: Response) => {
    const majors = await MajorService.findAll();
    res.render('majors/list', { majors });
  },

  createForm: (_req: Request, res: Response) => {
    res.render('majors/create');
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { error, value } = majorSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.message);
        return;
    }
    await MajorService.create(value);
    res.redirect('/majors');
    },


  delete: async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    await MajorService.delete(id);
    res.status(200).end(); // <- evita redirecionamento em AJAX
 }
};
