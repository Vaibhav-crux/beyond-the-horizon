import User, { IUser } from '../../models/User'; // Import IUser interface along with the User model

export async function createUser(name: string, email: string): Promise<IUser> {
  try {
    // Create a new user instance using the Mongoose model
    const newUser = new User({ name, email });

    // Save the new user to the database
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error('Error creating user in service:', error);
    throw new Error('Internal Server Error');
  }
}
