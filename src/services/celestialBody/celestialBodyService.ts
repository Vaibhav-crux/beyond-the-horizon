import CelestialBody, { ICelestialBody } from '../../models/CelestialBody';
import CelestialBodyDetails from '../../models/CelestialBodyDetails';
import logger from '../../utils/log/logger';

// Function to fetch all celestial bodies
export async function getAllCelestialBodies(): Promise<Partial<ICelestialBody>[]> {
  try {
    const celestialBodies = await CelestialBody.find({}, 'id name').exec();
    logger.info('Fetched all celestial bodies.');
    return celestialBodies;
  } catch (error) {
    logger.error('Error fetching celestial bodies in service:', error);
    throw error; // Pass the error up to be handled by the controller
  }
}

// Function to fetch celestial body and its details by celestialBodyId
export async function getCelestialBodyWithDetails(celestialBodyId: string) {
  try {
    // Fetch the celestial body details by the celestial body ID
    const celestialBodyDetails = await CelestialBodyDetails
      .findOne({ celestialBody: celestialBodyId })
      .populate('celestialBody', 'id name')  // Populate the celestialBody fields
      .exec();

    if (!celestialBodyDetails) {
      logger.error(`Celestial body details not found for id: ${celestialBodyId}`);
      return null;
    }

    logger.info(`Fetched celestial body details for id: ${celestialBodyId}`);
    return celestialBodyDetails;
  } catch (error) {
    logger.error('Error fetching celestial body with details in service:', error);
    throw error;
  }
}

// Function to create a new celestial body
export async function createCelestialBody(name: string): Promise<ICelestialBody> {
  try {
    const newCelestialBody = new CelestialBody({ name });
    await newCelestialBody.save();
    logger.info(`Created new celestial body with name: ${name}`);
    return newCelestialBody;
  } catch (error) {
    logger.error('Error creating celestial body in service:', error);
    throw error; // Pass the error up to be handled by the controller
  }
}

// Function to delete a celestial body by ID
export async function deleteCelestialBodyById(id: string): Promise<Partial<ICelestialBody> | null> {
  try {
    const deletedCelestialBody = await CelestialBody.findByIdAndDelete(id).exec();
    if (deletedCelestialBody) {
      logger.info(`Deleted celestial body with ID: ${id}`);
    } else {
      logger.warn(`Celestial body with ID: ${id} not found for deletion.`);
    }
    return deletedCelestialBody;
  } catch (error) {
    logger.error('Error deleting celestial body in service:', error);
    throw error; // Pass the error up to be handled by the controller
  }
}
