import { Request, Response } from 'express';
import { createCelestialBody, getAllCelestialBodies } from '../../services/celestialBody/celestialBodyService';

// Function to get all celestial bodies
export async function getCelestialBodiesController(req: Request, res: Response): Promise<void> {
  try {
    const celestialBodies = await getAllCelestialBodies();
    res.status(200).json(celestialBodies);
  } catch (error) {
    console.error('Error fetching celestial bodies in controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to create a celestial body
export async function createCelestialBodyController(req: Request, res: Response): Promise<void> {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    const newCelestialBody = await createCelestialBody(name);
    res.status(201).json(newCelestialBody);
  } catch (error) {
    console.error('Error creating celestial body in controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
