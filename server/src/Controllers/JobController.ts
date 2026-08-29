import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';

import { jobModel } from '../Models/JobModel.ts';

/*

/create
/delete
/edit

*/

interface IJobController {
    create: RequestHandler;
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

    delete: async (req: Request, res: Response) => {
        try {
            
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
