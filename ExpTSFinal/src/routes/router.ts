import { Router, Request, Response, NextFunction } from 'express';
import userRoutes from './userRoutes';
import homeRoutes from './homeRoutes';
import loremRouter from './lorem';
import handlebarsRouter from '../routes/handlebars';
import majorRoutes from '../routes/majorRoutes';
import session from 'express-session';




const router = Router();


router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use('/', majorRoutes);
router.use('/', loremRouter);
router.use('/', handlebarsRouter);
router.use('/', majorRoutes);

function requireLogin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.get('/', requireLogin, (req, res) => {
  res.render('home');
});


router.get('/play', requireLogin, (req, res) => {
  res.render('play');
});
export default router;
