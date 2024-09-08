import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/database';
import userRoutes from './routes/user/userRoutes.routes';
import celestialBodyRoutes from './routes/celestialBody/celestialBody.routes';
import celestialBodyDetailRoutes from './routes/celestialBody/celestialBodyDetails.routes';
import corsHandler from './middlewares/corsHandler';
import errorHandler from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(corsHandler); // Add CORS middleware
app.use(express.json());

connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Hello, Space Explorer!');
    });

    // Define routes
    app.use('/api', userRoutes);
    app.use('/api', celestialBodyRoutes);
    app.use('/api', celestialBodyDetailRoutes);

    // Error handling middleware should be used after all route handlers
    app.use(errorHandler);

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
