import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

// custom imports
import jobRouter from './routes/jobRouter.js';

app.use('/api/v1/jobs', jobRouter);

const app = express();

dotenv.config();

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
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
