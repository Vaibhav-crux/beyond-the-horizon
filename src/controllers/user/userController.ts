import { Request, Response, NextFunction } from 'express';
import { createUser, deleteUserById, getAllUsers } from '../../services/user/userService';
import logger from '../../utils/log/logger';

export async function getAllUsersController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await getAllUsers();
    logger.info('Controller: Fetched all users successfully.');
    res.status(200).json(users);
  } catch (error) {
    const err = error as Error;
    logger.error(`Error fetching users in controller: ${err.message}`);
    next(err); // Pass the error to the error handler middleware
  }
}


export async function createUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      const error = new Error('Name and email are required');
      error.name = 'ValidationError';
      logger.warn('Validation error: Missing name or email in request body.');
      return next(error);
    }

    const newUser = await createUser(name, email);
    logger.info(`User created successfully in controller with email: ${email}`);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Error creating user in controller:', error);
    next(error); // Pass the error to the error handler middleware
  }
}


export async function deleteUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('User ID is required');
      error.name = 'ValidationError';
      logger.warn('Validation error: Missing user ID in request parameters.');
      return next(error);
    }

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      const error = new Error('User not found');
      error.name = 'NotFoundError';
      logger.warn(`User with ID ${id} not found in controller.`);
      return next(error);
    }

    logger.info(`User with ID ${id} deleted successfully in controller.`);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    const err = error as Error;  // Explicitly cast to Error
    logger.error(`Error deleting user in controller: ${err.message}`);
    next(err); // Pass the error to the error handler middleware
  }
}