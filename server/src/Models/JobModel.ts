import { jobsTable } from '../db/schema.ts';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.ts';

interface IJobModel {
    getAllByOwner(userId: number): any;
    getOneById(jobId: number): any;
    delete(jobId: number): any;
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
    },

    async getOneById(jobId: number) {
        try {
            if (isNaN(jobId)) return null;

            const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, jobId));
            return job ?? null;
        } catch (err) {
            console.log(err);
        }
    },

    async getAllByOwner(userId: number) {
        try {
            const jobs = await db.select().from(jobsTable).where(eq(jobsTable.owner, userId));
            return jobs;
        } catch (err) {
            console.log(err);
        }
    },

    async delete(jobId: number) {
        try {
            const deletedJob = await db.delete(jobsTable).where(eq(jobsTable.id, jobId)).returning();
            return deletedJob;
        } catch (err) {
            console.log(err);
        }
    }
};
