import { Request, Response } from 'express';
import { createCelestialBodyDetails, getAllCelestialBodyDetails } from '../../services/celestialBody/celestialBodyDetailsService';

export async function getCelestialBodyDetailsController(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all celestial body details
      const celestialBodyDetails = await getAllCelestialBodyDetails();
  
      // Respond with the fetched data
      res.status(200).json(celestialBodyDetails);
    } catch (error) {
      console.error('Error fetching celestial body details in controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


export async function createCelestialBodyDetailsController(req: Request, res: Response): Promise<void> {
  try {
    const { celestialBodyId, details, avgDistance, estTravelTime, summary } = req.body;

    // Validate request body
    if (!celestialBodyId || !details || !avgDistance || !estTravelTime || !summary) {
      res.status(400).json({ error: 'All fields are required' });
      return;
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
