import { Request, Response } from 'express';
import * as majorService from '../services/majorService';

export const listMajors = async (req: Request, res: Response) => {
  const majors = await majorService.getAllMajors();
  res.render('majors/list', { majors });
};

export const showMajor = async (req: Request, res: Response) => {
  const major = await majorService.getMajorById(req.params.id);
  if (!major) return res.status(404).send('Major not found');
  res.render('majors/detail', { major });
};

export const createMajor = async (req: Request, res: Response) => {
  const { name, code } = req.body;
  await majorService.createMajor({ name, code});
  res.redirect('/majors');
};

export const updateMajor = async (req: Request, res: Response) => {
  const { name, code, description } = req.body;
  await majorService.updateMajor(req.params.id, { name, code, description });
  res.redirect('/majors');
};

export const deleteMajor = async (req: Request, res: Response) => {
  await majorService.deleteMajor(req.params.id);
  res.redirect('/majors');
};


