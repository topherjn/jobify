import 'express-async-errors';
import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

// C - CREATE JOB
// async errors lib takes care of try catch block
export const createJob = async (req, res) => {  
    const { company, position } = req.body;
    const job = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({ job });
};

// R - GET ALL JOBS
// parameter empty on find gets all jobs
// can get a single job with find({id: id  })   
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs });
};

// R - GET JOB
export const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
};

// U - UPDATE JOB
export const updateJob = async (req, res) => {    
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(StatusCodes.OK).json({msg: 'job modified', updatedJob});
};

// D - DELETE JOB
export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({msg: 'job removed', removedJob});
};
