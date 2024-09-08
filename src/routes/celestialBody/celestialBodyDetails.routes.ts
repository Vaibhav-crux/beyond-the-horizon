import { Router } from 'express';
import { createCelestialBodyDetailsController, getCelestialBodyDetailsController, updateCelestialBodyDetailsController, deleteCelestialBodyDetailsController } from '../../controllers/celestialBody/celestialBodyDetailsController';

const router = Router();

// POST route to create a new celestial body detail
router.post('/celestialBodyDetails', createCelestialBodyDetailsController);

// GET route to fetch all celestial body details
router.get('/celestialBodyDetails', getCelestialBodyDetailsController);

// PATCH route to update an existing celestial body detail
router.patch('/celestialBodyDetails/:id', updateCelestialBodyDetailsController);

// DELETE route to remove a celestial body detail by ID
router.delete('/celestialBodyDetails/:id', deleteCelestialBodyDetailsController);

export default router;
