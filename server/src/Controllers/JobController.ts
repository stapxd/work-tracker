import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';

import { jobModel } from '../Models/JobModel.ts';

/*

/create
/delete
/edit

*/

interface IJobController {
    create: RequestHandler;
    getAllByMe: RequestHandler;
    getOneById: RequestHandler;
    edit: RequestHandler;
    delete: RequestHandler;
}

export const jobController: IJobController = {
    create: async (req: Request, res: Response) => {
        try {
            const title: string = req.body.title;
            const owner: number = req.userId!;

            const newJob = await jobModel.create(title, owner);

            console.log(newJob);

            if(!newJob) {
                throw 'Could not create the job.'
            }

            res.status(200).json({
                job: newJob
            });

        } catch(error) {
            res.status(500).json({
                message: 'Error creating job. Try again later.'
            });
        }
    },

    getOneById: async (req: Request, res: Response) => {
        try {
            const idParam = req.params.id;
            const idString = Array.isArray(idParam) ? idParam[0] : idParam;
            const jobId = parseInt(idString, 10);

            const job = await jobModel.getOneById(jobId);

            if(!job) {
                throw 'Job not found.'
            }

            if(job.owner !== req.userId) {
                res.status(404).json({
                    message: 'Job not found.'
                });
                return;
            }

            res.status(200).json({
                job: job
            });

        } catch(error) {
            res.status(500).json({
                message: 'Error getting job. Try again later.'
            });
        }
    },

    getAllByMe: async (req: Request, res: Response) => {
        try {
            const jobs = await jobModel.getAllByOwner(req.userId!);

            res.status(200).json({
                jobs: jobs
            });
        } catch(error) {
            res.status(500).json({
                message: 'Error getting jobs. Try again later.'
            });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const jobId: number = req.body.jobId;

            const deletedJob = await jobModel.delete(jobId);

            if(!deletedJob) {
                throw 'Could not delete the job.'
            }
            
            res.status(200).json({
                message: 'Job deleted successfully.'
            });            
        } catch(error) {
            //console.log(error);
            res.status(500).json({
                message: 'Error deleting job. Try again later.'
            });
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            
        } catch(error) {
            res.status(500).json({
                message: 'Error editing job. Try again later.'
            });
        }
    },

};

export default jobController;
