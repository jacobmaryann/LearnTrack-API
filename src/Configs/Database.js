import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';


const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log('Database connection success');
        const error = mongoose.connection.on('error', (err) => {

    if (error) {
      console.error('Database connection failed', error);
      process.exit();
    }
});
});

export default connectDB;