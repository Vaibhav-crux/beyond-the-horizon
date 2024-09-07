import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL ?? 'mongodb://localhost:27017/mydatabase', {
      // No need to specify useNewUrlParser or useUnifiedTopology in the latest Mongoose versions
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
