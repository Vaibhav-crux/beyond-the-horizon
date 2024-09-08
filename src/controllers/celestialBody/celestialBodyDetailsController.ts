import { Request, Response, NextFunction } from 'express';
import { createCelestialBodyDetails, getAllCelestialBodyDetails, updateCelestialBodyDetails, deleteCelestialBodyDetails } from '../../services/celestialBody/celestialBodyDetailsService';

export async function getCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Fetch all celestial body details
      const celestialBodyDetails = await getAllCelestialBodyDetails();
  
      // Respond with the fetched data
      res.status(200).json(celestialBodyDetails);
    } catch (error) {
      console.error('Error fetching celestial body details in controller:', error);
      next(error); // Pass the error to the error handler middleware
    }
  }

export async function createCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { celestialBodyId, details, avgDistance, estTravelTime, summary } = req.body;

    // Validate request body
    if (!celestialBodyId || !details || !avgDistance || !estTravelTime || !summary) {
      const error = new Error('All fields are required');
      error.name = 'ValidationError'; // Set the error name to trigger the correct error handler
      throw error;
    }

    // Call the service to create a new celestial body detail
    const newCelestialBodyDetails = await createCelestialBodyDetails(
      celestialBodyId,
      details,
      avgDistance,
      estTravelTime,
      summary
    );

    // Respond with the created celestial body details
    res.status(201).json(newCelestialBodyDetails);
  } catch (error) {
    console.error('Error creating celestial body details in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}

export async function updateCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate request body
    if (!id || Object.keys(updates).length === 0) {
      const error = new Error('ID and at least one update field are required');
      error.name = 'ValidationError';
      throw error;
    }

    // Call the service to update celestial body details
    const updatedCelestialBodyDetails = await updateCelestialBodyDetails(id, updates);

    if (!updatedCelestialBodyDetails) {
      const error = new Error('Celestial Body Details not found');
      error.name = 'NotFoundError';
      throw error;
    }

    // Respond with the updated celestial body details
    res.status(200).json(updatedCelestialBodyDetails);
  } catch (error) {
    console.error('Error updating celestial body details in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}

export async function deleteCelestialBodyDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      const error = new Error('ID is required');
      error.name = 'ValidationError';
      throw error;
    }

    // Call the service to delete celestial body details
    await deleteCelestialBodyDetails(id);

    // Respond with a success message
    res.status(200).json({ message: 'Celestial Body Details deleted successfully' });
  } catch (error) {
    console.error('Error deleting celestial body details in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}
