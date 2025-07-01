import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
import { validateEnv } from './utils/validateEnv';
import { logger }      from './middlewares/logger';
import router           from './router/router';
import session from 'express-session';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'chave_secreta',
  resave: false,
  saveUninitialized: false
}));

app.engine('handlebars', engine({
  helpers: {
    nodeTechList: function (technologies: any[]) {
      let result = '<ul>';
      technologies.forEach(tech => {
        if (tech.poweredByNodejs) {
          result += `<li>${tech.name} (${tech.type})</li>`;
        }
      });
      result += '</ul>';
      return result;
    }
  }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use('/jogo', express.static(path.join(__dirname, 'public')));


app.use(logger('completo'));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((req, res, next) => {
  res.locals.userName = req.session?.userName;
  next();
});

router.get('/teste', (_req, res) => {
  res.render('teste');
});

app.use('/', router);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
