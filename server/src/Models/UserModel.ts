import { usersTable } from '../db/schema.ts';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.ts';

interface IUserModel {
    register(username: string, hashedPassword: string): any;
    findByUsername(username: string): any;
    findById(userId: number): any;
}

export const userModel: IUserModel = {
    async register(username: string, hashedPassword: string) {
        const [newUser] = await db.insert(usersTable).values({
            username: username,
            hashed_password: hashedPassword,
        }).returning();

        return newUser;
    },

    async findByUsername(username: string) {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username));

        return user;
    },

    async findById(userId: number) {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));

        return user;
    }
};
