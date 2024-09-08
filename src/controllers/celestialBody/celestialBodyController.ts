import { Request, Response, NextFunction } from 'express';
import { createCelestialBody, getAllCelestialBodies, deleteCelestialBodyById } from '../../services/celestialBody/celestialBodyService';

// Function to get all celestial bodies
export async function getCelestialBodiesController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const celestialBodies = await getAllCelestialBodies();
    res.status(200).json(celestialBodies);
  } catch (error) {
    console.error('Error fetching celestial bodies in controller:', error);
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
      throw error;
    }

    const newCelestialBody = await createCelestialBody(name);
    res.status(201).json(newCelestialBody);
  } catch (error) {
    console.error('Error creating celestial body in controller:', error);
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
      throw error;
    }

    const deletedCelestialBody = await deleteCelestialBodyById(id);

    if (!deletedCelestialBody) {
      const error = new Error('Celestial Body not found');
      error.name = 'NotFoundError';
      throw error;
    }

    res.status(200).json({ message: 'Celestial Body deleted successfully' });
  } catch (error) {
    console.error('Error deleting celestial body in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}
