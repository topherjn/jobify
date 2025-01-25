import 'express-async-errors';
import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

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
    req.body.createdBy = req.user.userId;
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
    console.log(req.params.id);
    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};

export const showStats = async (req, res) => {
    const defaultStats = {
        pending: 22,
        interview: 11,
        declined: 4
    }
    let monthlyApplications = [
        {
            date: 'May 23',
            count: 12,
        },
        {
            date: 'Jun 23',
            count: 9,
        },
        {
            date: 'Jul 23',
            count: 3,
        }
    ];
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};