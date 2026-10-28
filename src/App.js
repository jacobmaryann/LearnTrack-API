import dotenv from 'dotenv';
dotenv.config();
import logRequests from './Middlewares/logger.js'
import errorHandler from './Middlewares/erroHandler.js'
import express from 'express'
import cors from 'cors'


import goalRoute from './Routes/goalRoute.js';
import sessionRoute from './Routes/sessionRoute.js';
import userRoute from './Routes/userRoute.js';

const app = express();
app.use(express.json());
app.use(logRequests)

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/goals', goalRoute);
app.use('/api/v1/sessions', sessionRoute);
app.use(errorHandler);

export default app;