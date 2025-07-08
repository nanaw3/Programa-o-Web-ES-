import { Router } from 'express';
import * as controller from '../controllers/userController';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = Router();

router.get('/users', controller.list);
router.post('/users', controller.createUser);

router.get('/login', controller.showLoginForm);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.get('/profile/edit', controller.showEditProfile);
router.post('/profile/edit', controller.updateProfile);

router.get('/profile/password', controller.showPasswordForm);
router.post('/profile/password', controller.updatePassword);



router.post('/users/:id/edit', controller.updateUser);
router.post('/users/:id/delete', controller.deleteUser);
router.get('/users/register', controller.showRegisterForm);      
router.post('/users/register', controller.registerUser);          
router.get('/users/:id', controller.showUser);    

router.post('/game-session', async (req, res) => {
  const userId = req.session.user?.id;
  let { score } = req.body;

  if (!userId) return res.status(401).send('N autorizado');

  score = parseInt(score);

  if (isNaN(score)) return res.status(400).send('Pontuação invalida');

  await prisma.gameSession.create({
    data: {
      user_id: userId,
      score,
    },
  });

  res.status(200).send('Pontuação salva');
});

router.get('/ranking', async (req, res) => {
  const ranking = await prisma.gameSession.findMany({
    orderBy: { score: 'desc' },
    include: {
      user: {
        select: {
          full_name: true,
          major: { select: { name: true } }
        }
      }
    },
    take: 10
  });

  res.render('users/ranking', { ranking });
  console.log('Ranking:', ranking);
});



export default router;
