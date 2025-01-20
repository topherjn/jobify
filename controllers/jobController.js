import 'express-async-errors';
import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

// C - CREATE JOB
// async errors lib takes care of try catch block
export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

// R - GET ALL JOBS
// parameter empty on find gets all jobs
// can get a single job with find({id: id  })   
export const getAllJobs = async (req, res) => {
    console.log(req.user);
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs });
};

// R - GET JOB
export const getJob = async (req, res) => {
    req.body.createdBy= req.user.userId;
    console.log(req.params.id);
    const job = await Job.findById(req.params.id);
    console.log(job);
    res.status(StatusCodes.OK).json({ job });
};

// U - UPDATE JOB
export const updateJob = async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(StatusCodes.OK).json({ msg: 'job modified', updatedJob });
};

// D - DELETE JOB
export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'job removed', removedJob });
};
