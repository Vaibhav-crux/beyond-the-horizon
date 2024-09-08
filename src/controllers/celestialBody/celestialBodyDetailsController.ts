import { Request, Response, NextFunction } from 'express';
import { createCelestialBodyDetails, getAllCelestialBodyDetails, updateCelestialBodyDetails, deleteCelestialBodyDetails } from '../../services/celestialBody/celestialBodyDetailsService';
import logger from '../../utils/log/logger';

export async function getCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const celestialBodyDetails = await getAllCelestialBodyDetails();
    logger.info('Controller: Fetched celestial body details successfully.');
    res.status(200).json(celestialBodyDetails);
  } catch (error) {
    logger.error('Error fetching celestial body details in controller:', error);
    next(error);
  }
}

export async function createCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { celestialBodyId, details, avgDistance, estTravelTime, summary } = req.body;

    if (!celestialBodyId || !details || !avgDistance || !estTravelTime || !summary) {
      const error = new Error('All fields are required');
      error.name = 'ValidationError';
      logger.warn('Validation error: Missing required fields in request body.');
      throw error;
    }

    const newCelestialBodyDetails = await createCelestialBodyDetails(
      celestialBodyId,
      details,
      avgDistance,
      estTravelTime,
      summary
    );

    logger.info('Controller: Created celestial body details successfully.');
    res.status(201).json(newCelestialBodyDetails);
  } catch (error) {
    logger.error('Error creating celestial body details in controller:', error);
    next(error);
  }
}

export async function updateCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id || Object.keys(updates).length === 0) {
      const error = new Error('ID and at least one update field are required');
      error.name = 'ValidationError';
      logger.warn('Validation error: ID or update fields missing in request.');
      throw error;
    }

    const updatedCelestialBodyDetails = await updateCelestialBodyDetails(id, updates);

    if (!updatedCelestialBodyDetails) {
      const error = new Error('Celestial Body Details not found');
      error.name = 'NotFoundError';
      logger.warn(`Controller: Celestial Body Details with ID ${id} not found.`);
      throw error;
    }

    logger.info('Controller: Updated celestial body details successfully.');
    res.status(200).json(updatedCelestialBodyDetails);
  } catch (error) {
    logger.error('Error updating celestial body details in controller:', error);
    next(error);
  }
}

export async function deleteCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('ID is required');
      error.name = 'ValidationError';
      logger.warn('Validation error: ID missing in request.');
      throw error;
    }

    await deleteCelestialBodyDetails(id);

    logger.info('Controller: Deleted celestial body details successfully.');
    res.status(200).json({ message: 'Celestial Body Details deleted successfully' });
  } catch (error) {
    logger.error('Error deleting celestial body details in controller:', error);
    next(error);
  }
}
