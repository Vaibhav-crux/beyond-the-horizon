import { Request, Response } from 'express';
import { createUser } from '../../services/user/userService';

export async function createUserController(req: Request, res: Response): Promise<void> {
  try {
    const { name, email } = req.body;

    // Validate request body
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }

    // Call the service to create a new user
    const newUser = await createUser(name, email);

    // Respond with the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user in controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
