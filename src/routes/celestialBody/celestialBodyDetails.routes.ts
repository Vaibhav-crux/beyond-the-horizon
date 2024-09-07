import { Router } from 'express';
import { createCelestialBodyDetailsController, getCelestialBodyDetailsController } from '../../controllers/celestialBody/celestialBodyDetailsController';

const router = Router();

// POST route to create a new celestial body detail
router.post('/celestialBodyDetails', createCelestialBodyDetailsController);
router.get('/celestialBodyDetails', getCelestialBodyDetailsController);

export default router;
