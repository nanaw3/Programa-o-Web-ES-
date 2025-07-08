import { Router } from 'express';
import * as controller from '../controllers/majorController';

const router = Router();

router.get('/majors', controller.listMajors);
router.get('/majors/create', (req, res) => {
  res.render('majors/create');
});
router.get('/majors/:id', controller.showMajor);
router.post('/majors', controller.createMajor);
router.post('/majors/:id/edit', controller.updateMajor);
router.post('/majors/:id/delete', controller.deleteMajor);



export default router;
