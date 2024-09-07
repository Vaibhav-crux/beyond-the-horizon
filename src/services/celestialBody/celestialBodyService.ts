import CelestialBody, { ICelestialBody } from '../../models/CelestialBody'; // Import the Mongoose model and interface

// Function to fetch all celestial bodies
export async function getAllCelestialBodies(): Promise<Partial<ICelestialBody>[]> {
  try {
    // Fetch all celestial bodies, selecting only the id and name fields
    const celestialBodies = await CelestialBody.find({}, 'id name').exec();
    return celestialBodies;
  } catch (error) {
    console.error('Error fetching celestial bodies in service:', error);
    throw new Error('Internal Server Error');
  }
}

// Function to create a new celestial body
export async function createCelestialBody(name: string): Promise<ICelestialBody> {
  try {
    // Create a new celestial body instance
    const newCelestialBody = new CelestialBody({ name });
    await newCelestialBody.save(); // Save the new celestial body to the database

    return newCelestialBody;
  } catch (error) {
    console.error('Error creating celestial body in service:', error);
    throw new Error('Internal Server Error');
  }
}
