import express from "express";
import path from 'path';
import handlebarsRouter from "./routes/handlebars";
import { config } from 'dotenv';
import { validateEnv } from "./utils/validateEnv";
import { logger } from "./middlewares/logger";
import loremRouter from "./routes/lorem";
import { UnknownObject } from "express-handlebars/types";
import router from './routes/router';
import { engine } from "express-handlebars";
import * as exphbs from 'express-handlebars';
import methodOverride from 'method-override';
import session from 'express-session';

const env = process.env.NODE_ENV || 'development';
config({ path: `.env.${env}` });
validateEnv();

const app = express();
const port = Number(process.env.PORT);

// Logger/rotas iniciais
app.use(logger);
app.use("/", loremRouter);

// Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'main',
  helpers: {
    ifPoweredByNodejs: function (poweredByNodejs: boolean, options: { fn: (arg0: any) => any }) {
      return poweredByNodejs ? options.fn(this) : "";
    }
  }
}));
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, '..', 'src', 'views'));

//login
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: false
}));


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Rotas
app.use(router);
app.use("/", handlebarsRouter);


//method override
app.use(methodOverride('_method'));


// Chama do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})
