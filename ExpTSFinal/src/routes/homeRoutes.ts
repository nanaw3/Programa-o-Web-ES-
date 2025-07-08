import { Router } from 'express';
import * as controller from '../controllers/mainController';



const router = Router();

router.get('/', controller.home);
router.get('/hb1', controller.hb1);
router.get('/hb2', controller.hb2);
router.get('/hb3', controller.hb3);
router.get('/hb4', controller.hb4);
router.get('/lorem/:qtd', controller.lorem);
router.get('/about', controller.about);

export default router;