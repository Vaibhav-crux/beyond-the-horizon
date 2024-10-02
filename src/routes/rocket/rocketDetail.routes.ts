import { Router } from 'express';
import { createRocketDetailController, getRocketDetailsController, deleteRocketDetailController } from '../../controllers/rocket/rocketDetailController';
import logger from '../../utils/log/logger';

const router = Router();

router.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Route to fetch all rocket details
router.get('/rocket/details', getRocketDetailsController);

// Route to create a rocket detail
router.post('/rocket/details', createRocketDetailController);

// Route to delete a rocket detail by ID
router.delete('/rocket/details/:id', deleteRocketDetailController);

export default router;
