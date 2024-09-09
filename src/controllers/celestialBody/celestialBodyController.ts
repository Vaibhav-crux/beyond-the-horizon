import { Request, Response, NextFunction } from 'express';
import { createCelestialBody, getAllCelestialBodies, deleteCelestialBodyById, getCelestialBodyWithDetails } from '../../services/celestialBody/celestialBodyService';
import logger from '../../utils/log/logger';

// Function to get all celestial bodies
export async function getCelestialBodiesController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const celestialBodies = await getAllCelestialBodies();
    logger.info('Controller: Fetched celestial bodies.');
    res.status(200).json(celestialBodies);
  } catch (error) {
    logger.error('Error fetching celestial bodies in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}

// Controller function to get celestial body and details by celestialBodyId
export async function getCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { celestialBodyId } = req.query;

  try {
    if (!celestialBodyId) {
      res.status(400).json({ error: 'celestialBodyId is required.' });
      return;
    }

    const celestialBodyDetails = await getCelestialBodyWithDetails(celestialBodyId as string);

    if (!celestialBodyDetails) {
      res.status(404).json({ error: 'Celestial body details not found.' });
      return;
    }

    logger.info(`Controller: Fetched celestial body details for id: ${celestialBodyId}`);
    res.status(200).json(celestialBodyDetails);
  } catch (error) {
    logger.error('Error fetching celestial body details in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}

// Function to create a celestial body
export async function createCelestialBodyController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name } = req.body;

    if (!name) {
      const error = new Error('Name is required');
      error.name = 'ValidationError';
      logger.warn('Attempt to create celestial body without a name.');
      throw error;
    }

    const newCelestialBody = await createCelestialBody(name);
    logger.info(`Controller: Created celestial body with name: ${name}`);
    res.status(201).json(newCelestialBody);
  } catch (error) {
    logger.error('Error creating celestial body in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}

// Function to delete a celestial body by ID
export async function deleteCelestialBodyController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('ID is required');
      error.name = 'ValidationError';
      logger.warn('Attempt to delete celestial body without an ID.');
      throw error;
    }

    const deletedCelestialBody = await deleteCelestialBodyById(id);

    if (!deletedCelestialBody) {
      const error = new Error('Celestial Body not found');
      error.name = 'NotFoundError';
      logger.warn(`Celestial body with ID: ${id} not found in controller.`);
      throw error;
    }

    logger.info(`Controller: Deleted celestial body with ID: ${id}`);
    res.status(200).json({ message: 'Celestial Body deleted successfully' });
  } catch (error) {
    logger.error('Error deleting celestial body in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}
