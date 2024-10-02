import { Request, Response, NextFunction } from 'express';
import { createRocket, getAllRockets, deleteRocketById } from '../../services/rocket/rocketService';
import logger from '../../utils/log/logger';

// Controller to get all rockets
export async function getRocketsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rockets = await getAllRockets();
    logger.info('Controller: Fetched rockets.');
    res.status(200).json(rockets);
  } catch (error) {
    logger.error('Error fetching rockets in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}

// Controller to create a new rocket
export async function createRocketController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name } = req.body;

    if (!name) {
      const error = new Error('Name is required');
      error.name = 'ValidationError';
      logger.warn('Attempt to create rocket without a name.');
      throw error;
    }

    const newRocket = await createRocket(name);
    logger.info(`Controller: Created rocket with name: ${name}`);
    res.status(201).json(newRocket);
  } catch (error) {
    logger.error('Error creating rocket in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}

// Controller to delete a rocket by ID
export async function deleteRocketController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
  
      if (!id) {
        const error = new Error('ID is required');
        error.name = 'ValidationError';
        throw error;
      }
  
      const deletedRocket = await deleteRocketById(id);
  
      if (!deletedRocket) {
        const error = new Error('Rocket not found');
        error.name = 'NotFoundError';
        throw error;
      }
  
      res.status(200).json({ message: 'Rocket deleted successfully' });
    } catch (error: any) {  // Cast error to 'any'
      if (error.message === 'Cannot delete rocket as it has associated details.') {
        res.status(400).json({ error: error.message });
      } else {
        next(error);  // Pass the error to the error handler middleware
      }
    }
  }