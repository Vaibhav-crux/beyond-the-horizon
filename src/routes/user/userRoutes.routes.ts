import { Router } from 'express';
import { createUserController, deleteUserController, getAllUsersController } from '../../controllers/user/userController';
import logger from '../../utils/log/logger';

const router = Router();

// Log each incoming request to the user routes
router.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Route to create a new user
router.post('/users', createUserController);

// Route to delete a user by ID
router.delete('/users/:id', deleteUserController);

// Route to get all users
router.get('/users', getAllUsersController);

export default router;
