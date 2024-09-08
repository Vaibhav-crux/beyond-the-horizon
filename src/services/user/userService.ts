import User, { IUser } from '../../models/User';
import logger from '../../utils/log/logger';

export async function getAllUsers(): Promise<IUser[]> {
  try {
    const users = await User.find().exec();
    logger.info('Fetched all users successfully.');
    return users;
  } catch (error) {
    const err = error as Error;
    logger.error(`Error fetching users in service: ${err.message}`);
    throw new Error('Internal Server Error');
  }
}


export async function createUser(name: string, email: string): Promise<IUser> {
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    logger.info(`User created successfully with email: ${email}`);
    return newUser;
  } catch (error) {
    logger.error('Error creating user in service:', error);
    throw new Error('Internal Server Error');
  }
}


export async function deleteUserById(userId: string): Promise<IUser | null> {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      logger.warn(`User with ID ${userId} not found for deletion.`);
      throw new Error('User not found');
    }

    logger.info(`User with ID ${userId} deleted successfully.`);
    return deletedUser;
  } catch (error) {
    const err = error as Error;  // Explicitly cast to Error
    logger.error(`Error deleting user in service: ${err.message}`);
    throw new Error('Internal Server Error');
  }
}
