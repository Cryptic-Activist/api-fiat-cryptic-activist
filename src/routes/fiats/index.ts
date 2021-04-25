import { Router } from 'express';

import { index, createFiat, createFiatsJSON } from '@controllers/fiats';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

router.get('', index);

router.post('/create', authenticateUser, createFiat);

router.post('/json/create', authenticateUser, createFiatsJSON);

export default router;
