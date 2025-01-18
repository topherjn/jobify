import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5100; 

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});

app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'Data received', data: req.body });
}); 


