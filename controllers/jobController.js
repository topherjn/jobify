import 'express-async-errors';
import Job from '../models/JobModel.js';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';


// parameter empty on find gets all jobs
// can get a single job with find({id: id  })   
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs });
};


// async errors lib takes care of try catch block
export const createJob = async (req, res) => {  
    const { company, position } = req.body;
    const job = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({ job });
}


export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'job not found' });
    }
    res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {    
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if(!updateJob) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'job not found' });
    }

    res.status(StatusCodes.OK).json({msg: 'job modified', updatedJob});
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id);

    if(!removedJob) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'job not found' });
    }   
    res.status(200).json({msg: 'job removed', removedJob});
};
