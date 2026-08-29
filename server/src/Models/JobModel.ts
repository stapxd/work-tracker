import { jobsTable } from '../db/schema.ts';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.ts';

interface IJobModel {
    create(title: string, userId: number): any;
}

export const jobModel: IJobModel = {
    async create(title: string, owner: number) {
        try {
            const [newJob] = await db.insert(jobsTable).values({
                title: title,
                owner: owner,
            }).returning();

            return newJob;
        } catch (err) {
            console.log(err);
        }
    }
};
