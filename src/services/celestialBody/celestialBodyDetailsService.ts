import CelestialBodyDetails, { ICelestialBodyDetails } from '../../models/CelestialBodyDetails';
import CelestialBody from '../../models/CelestialBody';
import logger from '../../utils/log/logger';

export async function getAllCelestialBodyDetails(): Promise<ICelestialBodyDetails[]> {
  try {
    const celestialBodyDetails = await CelestialBodyDetails.find()
      .populate('celestialBody', 'name')
      .exec();
      
    logger.info('Fetched all celestial body details successfully.');
    return celestialBodyDetails;
  } catch (error) {
    logger.error('Error fetching celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}

export async function createCelestialBodyDetails(
  celestialBodyId: string,
  details: string,
  avgDistance: number,
  estTravelTime: number,
  summary: string
): Promise<ICelestialBodyDetails> {
  try {
    const celestialBody = await CelestialBody.findById(celestialBodyId);

    if (!celestialBody) {
      logger.warn(`Celestial Body with ID ${celestialBodyId} not found.`);
      throw new Error('Celestial Body not found');
    }

    const newCelestialBodyDetails = new CelestialBodyDetails({
      celestialBody: celestialBody._id,
      details,
      avgDistance,
      estTravelTime,
      summary,
    });

    await newCelestialBodyDetails.save();

    logger.info(`Created new celestial body details for celestial body ID ${celestialBodyId}.`);
    return newCelestialBodyDetails;
  } catch (error) {
    logger.error('Error creating celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}

export async function updateCelestialBodyDetails(
  id: string,
  updates: Partial<ICelestialBodyDetails>
): Promise<ICelestialBodyDetails | null> {
  try {
    const updatedCelestialBodyDetails = await CelestialBodyDetails.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCelestialBodyDetails) {
      logger.warn(`Celestial Body Details with ID ${id} not found for update.`);
      throw new Error('Celestial Body Details not found');
    }

    logger.info(`Updated celestial body details for ID ${id}.`);
    return updatedCelestialBodyDetails;
  } catch (error) {
    logger.error('Error updating celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}

export async function deleteCelestialBodyDetails(id: string): Promise<void> {
  try {
    const result = await CelestialBodyDetails.findByIdAndDelete(id);

    if (!result) {
      logger.warn(`Celestial Body Details with ID ${id} not found for deletion.`);
      throw new Error('Celestial Body Details not found');
    }

    logger.info(`Deleted celestial body details for ID ${id}.`);
  } catch (error) {
    logger.error('Error deleting celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}
