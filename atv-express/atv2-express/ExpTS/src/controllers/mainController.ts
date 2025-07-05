import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

export const home = (req: Request, res: Response) => {
  res.render('home');
};

export const hb1 = (req: Request, res: Response) => {
  res.render('hb1');
};

export const hb2 = (req: Request, res: Response) => {
  res.render('hb2');
};

export const hb3 = (req: Request, res: Response) => {
  const professores = [
    { nome: 'David Fernandes', sala: '1238' },
    { nome: 'Horácio Fernandes', sala: '1234' },
    { nome: 'Eldeno Moura', sala: '1236' },
    { nome: 'Elaine Harada', sala: '1231' },
  ];
  res.render('hb3', { professores });
};

export const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];

  res.render('hb4', { technologies });
};

export const lorem = (req: Request, res: Response) => {
  const qtd = parseInt(req.params.qtd);
  const lorem = new LoremIpsum();
  const parags = Array.from({ length: qtd }, () => lorem.generateParagraphs(1));
  res.send(parags.join('\n\n'));
};
