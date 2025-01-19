import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

// custom imports
import jobRouter from './routes/jobRouter.js';

const app = express();

dotenv.config();

app.use('/api/v1/jobs', jobRouter);

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'Data received', data: req.body });
}); 


app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: error.message });
});

const port = process.env.PORT || 5100; 
import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
