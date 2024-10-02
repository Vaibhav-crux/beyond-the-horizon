import { Request, Response, NextFunction } from 'express';
import { createRocketDetails, getAllRocketDetails, deleteRocketDetailById } from '../../services/rocket/rocketDetailService';
import logger from '../../utils/log/logger';

// Controller to create new rocket details
export async function createRocketDetailController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { rocketId, description, launchDate, mission } = req.body;

    if (!rocketId || !description || !launchDate || !mission) {
      const error = new Error('All fields are required');
      error.name = 'ValidationError';
      logger.warn('Attempt to create rocket detail with missing fields.');
      throw error;
    }

    const newRocketDetail = await createRocketDetails(rocketId, description, new Date(launchDate), mission);
    logger.info(`Controller: Created rocket detail for rocket ID: ${rocketId}`);
    res.status(201).json(newRocketDetail);
  } catch (error) {
    logger.error('Error creating rocket detail in controller:', error);
    next(error);  // Pass the error to the error handler middleware
  }
}

// Controller to get all rocket details
export async function getRocketDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rocketDetails = await getAllRocketDetails();
    logger.info('Controller: Fetched rocket details.');
    res.status(200).json(rocketDetails);
  } catch (error) {
    logger.error('Error fetching rocket details in controller:', error);
    next(error);  // Pass the error to the error handler middleware
  }
}

// Controller to delete rocket detail by ID
export async function deleteRocketDetailController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('ID is required');
      error.name = 'ValidationError';
      logger.warn('Attempt to delete rocket detail without an ID.');
      throw error;
    }

    const deletedRocketDetail = await deleteRocketDetailById(id);

    if (!deletedRocketDetail) {
      const error = new Error('Rocket detail not found');
      error.name = 'NotFoundError';
      logger.warn(`Rocket detail with ID: ${id} not found in controller.`);
      throw error;
    }

    logger.info(`Controller: Deleted rocket detail with ID: ${id}`);
    res.status(200).json({ message: 'Rocket detail deleted successfully' });
  } catch (error) {
    logger.error('Error deleting rocket detail in controller:', error);
    next(error);  // Pass the error to the error handler middleware
  }
}
