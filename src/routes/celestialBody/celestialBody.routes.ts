import { Router } from 'express';
import { createCelestialBodyController, getCelestialBodiesController, deleteCelestialBodyController, getCelestialBodyDetailsController } from '../../controllers/celestialBody/celestialBodyController';
import logger from '../../utils/log/logger';

const router = Router();

router.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Route to fetch all celestial bodies
router.get('/celestialBody', getCelestialBodiesController);

router.get('/celestialBody/details', getCelestialBodyDetailsController);

// Route to create a celestial body
router.post('/celestialBody', createCelestialBodyController);

// Route to delete a celestial body by ID
router.delete('/celestialBody/:id', deleteCelestialBodyController);

export default router;
