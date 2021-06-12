import { Router } from 'express';
import { getUsers } from '../controllers/userController'

const router = Router();

router.route('/users').get(getUsers);

export default router;