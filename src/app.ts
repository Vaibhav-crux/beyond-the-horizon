import 'dotenv/config';
import express from 'express';
import connectDB from './config/database';
import userRoutes from './routes/user/userRoutes.routes';
import celestialBodyRoutes from './routes/celestialBody/celestialBody.routes';
import celestialBodyDetailRoutes from './routes/celestialBody/celestialBodyDetails.routes';
import rocketRoutes from './routes/rocket/rocket.routes'; 
import rocketDetaisRoutes from './routes/rocket/rocketDetail.routes'
import corsHandler from './middlewares/corsHandler';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/log/logger';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(corsHandler); // Add CORS middleware
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Beyond the Horizon API!');
});

// Define API routes
app.use('/api', userRoutes);
app.use('/api', celestialBodyRoutes);
app.use('/api', celestialBodyDetailRoutes);
app.use('/api', rocketRoutes);
app.use('/api', rocketDetaisRoutes);

// Middleware to catch invalid routes
app.use((req, res, next) => {
  const error = new Error(`Cannot ${req.method} ${req.originalUrl}`);
  error.name = 'NotFoundError';
  next(error);
});

// Error handling middleware should be used after all route handlers
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      logger.error('Error during database connection setup:', error.message);
    } else {
      logger.error('Unknown error during database connection setup:', error);
    }
    process.exit(1);
  });
