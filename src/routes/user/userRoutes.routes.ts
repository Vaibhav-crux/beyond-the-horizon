import { Router } from 'express';
import { createUserController } from '../../controllers/user/userController';

const router = Router();

// Route to create a new user
router.post('/users', createUserController);

export default router;
