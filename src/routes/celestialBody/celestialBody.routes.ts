// src/routes/celestialBody.routes.ts

import { Router } from 'express';
import { createCelestialBodyController, getCelestialBodiesController, deleteCelestialBodyController } from '../../controllers/celestialBody/celestialBodyController';

const router = Router();

// Route to create a celestial body
router.post('/celestialBody', createCelestialBodyController);

// Route to fetch all celestial bodies
router.get('/celestialBody', getCelestialBodiesController);

// Route to delete a celestial body by ID
router.delete('/celestialBody/:id', deleteCelestialBodyController);

export default router;
