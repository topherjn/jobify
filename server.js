import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end  ' },
];  

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

// Get all jobs
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// Create a job

app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ error: 'company and position are required' });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  
  res.status(200).json({ job });
});


//Get a single job 
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ error: 'job not found' });
  }
  res.status(200).json({ job });
});

// edit job
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  if(!company || !position) {
    return res.status(400).json({ error: 'company or position is required' });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ error: 'job not found' });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({msg: 'job modified', job});
});

// delete job
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if(!job) {
    return res.status(404).json({ error: 'job not found' });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: 'job deleted', job });
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
