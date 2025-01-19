import 'express-async-errors';
import Job from '../models/JobModel.js';
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end  ' },
];  


// parameter empty on find gets all jobs
// can get a single job with find({id: id  })   
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
};


// async errors lib takes care of try catch block
export const createJob = async (req, res) => {  
    const { company, position } = req.body;
    const job = await Job.create({ company, position });
    res.status(200).json({ job });
}


export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(404).json({ error: 'job not found' });
    }
    res.status(200).json({ job });
};

export const updateJob = async (req, res) => {    
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
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if(!job) {
        return res.status(404).json({ error: 'job not found' });
    }
    const newJobs = jobs.filter((job) => job.id !== id);
    jobs = newJobs;
    res.status(200).json({ msg: 'job deleted', job });
};
