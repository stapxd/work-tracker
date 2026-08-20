import { usersTable } from '../db/schema.ts';

import { db } from '../db/index.ts';

interface IUserModel {
    register(username: string, hashedPassword: string): any;
}

export const userModel: IUserModel = {
    async register(username: string, hashedPassword: string) {
        const [newUser] = await db.insert(usersTable).values({
            username: username,
            hashed_password: hashedPassword,
        }).returning();

        return newUser;
    }
};
