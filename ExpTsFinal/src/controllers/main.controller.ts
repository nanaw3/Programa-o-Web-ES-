import { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 6, min: 3 },
  wordsPerSentence:     { max: 16, min: 4 }
});

export const MainController = {
  home: (_req: Request, res: Response) => {
    res.send('Servidor funcionando!');
  },

  about: (_req: Request, res: Response) => {
    res.render('about', {
      title: 'Sobre o Jogo',
      description: 'Space Shooter é um jogo de nave onde o jogador enfrenta hordas de inimigos espaciais em busca da pontuação mais alta.',
      imagePath: '/public/img/nave.png'
    });
  },

  lorem: (req: Request, res: Response) => {
    const qtd = parseInt(req.params.qtd);

    if (isNaN(qtd) || qtd <= 0) {
      res.status(400).send('Quantidade inválida de parágrafos');
      return;
    }

    const parags = Array
      .from({ length: qtd })
      .map(() => `<p>${lorem.generateParagraphs(1)}</p>`)
      .join('\n');

    res.send(`
      <html>
        <head><title>Lorem Ipsum</title></head>
        <body>
          <h1>${qtd} parágrafo(s) gerado(s)</h1>
          ${parags}
        </body>
      </html>
    `);
  },

  hb1: (_req: Request, res: Response) => {
    res.render('hb1', {
      mensagem: 'Olá! Esta é a variável enviada para o Handlebars.'
    });
  },

  hb2: (_req: Request, res: Response) => {
    res.render('hb2', {
      usuarioLogado: true
    });
  },

  hb3: (_req: Request, res: Response) => {
    res.render('hb3', {
      frutas: ['Maçã', 'Banana', 'Uva', 'Melancia']
    });
  },

  hb4: (_req: Request, res: Response) => {
    const technologies = [
      { name: 'Express', type: 'Framework', poweredByNodejs: true },
      { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
      { name: 'React', type: 'Library', poweredByNodejs: true },
      { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
      { name: 'Django', type: 'Framework', poweredByNodejs: false },
      { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
      { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true }
    ];

    res.render('hb4', {
      technologies
    });
  }
};
