import Rocket, { IRocket } from '../../models/Rocket';
import logger from '../../utils/log/logger';
import RocketDetails from '../../models/RocketDetails';

// Function to fetch all rockets
export async function getAllRockets(): Promise<Partial<IRocket>[]> {
  try {
    const rockets = await Rocket.find({}, 'id name').exec();
    logger.info('Fetched all rockets.');
    return rockets;
  } catch (error) {
    logger.error('Error fetching rockets in service:', error);
    throw error;
  }
}

// Function to create a new rocket
export async function createRocket(name: string): Promise<IRocket> {
  try {
    const newRocket = new Rocket({ name });
    await newRocket.save();
    logger.info(`Created new rocket with name: ${name}`);
    return newRocket;
  } catch (error) {
    logger.error('Error creating rocket in service:', error);
    throw error;
  }
}

// Function to delete a rocket by ID
export async function deleteRocketById(id: string): Promise<Partial<IRocket> | null> {
    try {
      // Check if there are any RocketDetails associated with this rocket
      const rocketDetailsCount = await RocketDetails.countDocuments({ rocketId: id }).exec();  // Use rocketId here
  
      if (rocketDetailsCount > 0) {
        throw new Error('Cannot delete rocket as it has associated details.');
      }
  
      // If no rocket details exist, proceed with deletion
      const deletedRocket = await Rocket.findByIdAndDelete(id).exec();
      return deletedRocket;
    } catch (error) {
      throw error;  // Pass error up to the controller
    }
  }