import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/database'; // Import the correct connectDB function
import userRoutes from './routes/user/userRoutes.routes';
import celestialBodyRoutes from './routes/celestialBody/celestialBody.routes';
import celestialBodyDetailRoutes from './routes/celestialBody/celestialBodyDetails.routes';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

connectDB() // Directly call connectDB to connect to MongoDB
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Hello, Space Explorer!');
    });

    app.use('/api', userRoutes);
    app.use('/api', celestialBodyRoutes);
    app.use('/api', celestialBodyDetailRoutes);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('Error during database connection setup:', error.message);
    } else {
      console.error('Unknown error during database connection setup:', error);
    }
    process.exit(1);
  });
