import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

// custom imports
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/v1/jobs', jobRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.use(errorHandlerMiddleware);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: error.message });
});

const port = process.env.PORT || 5100;


try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
