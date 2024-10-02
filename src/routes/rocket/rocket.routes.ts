import { Router } from 'express';
import { createRocketController, getRocketsController, deleteRocketController } from '../../controllers/rocket/rocketController';
import logger from '../../utils/log/logger';

const router = Router();

router.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Route to fetch all rockets
router.get('/rocket', getRocketsController);

// Route to create a rocket
router.post('/rocket', createRocketController);

// Route to delete a rocket by ID
router.delete('/rocket/:id', deleteRocketController);

export default router;
