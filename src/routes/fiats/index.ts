import { Router } from 'express';

import {
  index,
  createFiatController,
  createFiatsJSON,
} from '@controllers/fiats';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

router.get('', index);

router.post('/create', authenticateUser, createFiatController);

router.post('/json/create', authenticateUser, createFiatsJSON);

export default router;
