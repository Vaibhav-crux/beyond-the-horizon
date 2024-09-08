import CelestialBody, { ICelestialBody } from '../../models/CelestialBody';

// Function to fetch all celestial bodies
export async function getAllCelestialBodies(): Promise<Partial<ICelestialBody>[]> {
  try {
    const celestialBodies = await CelestialBody.find({}, 'id name').exec();
    return celestialBodies;
  } catch (error) {
    console.error('Error fetching celestial bodies in service:', error);
    throw error; // Pass the error up to be handled by the controller
  }
}

// Function to create a new celestial body
export async function createCelestialBody(name: string): Promise<ICelestialBody> {
  try {
    const newCelestialBody = new CelestialBody({ name });
    await newCelestialBody.save();
    return newCelestialBody;
  } catch (error) {
    console.error('Error creating celestial body in service:', error);
    throw error; // Pass the error up to be handled by the controller
  }
}

// Function to delete a celestial body by ID
export async function deleteCelestialBodyById(id: string): Promise<Partial<ICelestialBody> | null> {
  try {
    const deletedCelestialBody = await CelestialBody.findByIdAndDelete(id).exec();
    return deletedCelestialBody;
  } catch (error) {
    console.error('Error deleting celestial body in service:', error);
    throw error; // Pass the error up to be handled by the controller
  }
}
