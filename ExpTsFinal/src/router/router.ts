import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';
import { MainController } from '../controllers/main.controller';
import { MajorController } from '../controllers/major.controller';
import { UserController } from '../controllers/user.controller';
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { GameController } from '../controllers/game.controller';
import { saveScore } from '../controllers/score.controller';
import { RankingController } from '../controllers/ranking.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { isAuthenticated } from '../middlewares/auth.middleware';


const router = Router();

// CRUD Majors
router.get('/majors', MajorController.list);
router.get('/majors/create', MajorController.createForm);
router.post('/majors/create', express.urlencoded({ extended: true }), MajorController.create);
router.post('/majors/:id/delete', MajorController.delete);

// CRUD Users
router.get('/users', UserController.list);
router.get('/users/create', UserController.createForm);
router.post('/users/create', express.urlencoded({ extended: true }), UserController.create);
router.post('/users/:id/delete', UserController.delete);

// Registration
router.get('/register', UserController.registerForm);
router.post('/register', express.urlencoded({ extended: true }), UserController.register);

// Authentication
router.get('/login', AuthController.loginForm);
router.post('/login', express.urlencoded({ extended: true }), asyncHandler(AuthController.login));
router.get('/logout', AuthController.logout);

// Ranking
router.get('/ranking', isAuthenticated, RankingController.ranking);

router.get('/', isAuthenticated, GameController.jogar);

// Test route
router.get('/teste', (_req, res) => {
  res.render('teste', { title: 'Página de Teste' });
});

export default router;