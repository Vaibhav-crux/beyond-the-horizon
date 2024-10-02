import RocketDetails, { IRocketDetails } from '../../models/RocketDetails';
import logger from '../../utils/log/logger';

// Function to create a new RocketDetail
export async function createRocketDetails(
  rocketId: string,
  description: string,
  launchDate: Date,
  mission: string
): Promise<IRocketDetails> {
  try {
    const newRocketDetail = new RocketDetails({
      rocketId,
      description,
      launchDate,
      mission,
    });

    await newRocketDetail.save();
    logger.info(`Created new rocket detail for rocket ID: ${rocketId}`);
    return newRocketDetail;
  } catch (error) {
    logger.error('Error creating rocket detail in service:', error);
    throw error;
  }
}

// Function to fetch all RocketDetails
export async function getAllRocketDetails(): Promise<Partial<IRocketDetails>[]> {
  try {
    const rocketDetails = await RocketDetails.find({})
      .populate('rocketId', 'name')  // Populate rocket name
      .exec();
    logger.info('Fetched all rocket details.');
    return rocketDetails;
  } catch (error) {
    logger.error('Error fetching rocket details in service:', error);
    throw error;
  }
}

// Function to delete RocketDetail by ID
export async function deleteRocketDetailById(id: string): Promise<Partial<IRocketDetails> | null> {
  try {
    const deletedRocketDetail = await RocketDetails.findByIdAndDelete(id).exec();
    if (deletedRocketDetail) {
      logger.info(`Deleted rocket detail with ID: ${id}`);
    } else {
      logger.warn(`Rocket detail with ID: ${id} not found for deletion.`);
    }
    return deletedRocketDetail;
  } catch (error) {
    logger.error('Error deleting rocket detail in service:', error);
    throw error;
  }
}
