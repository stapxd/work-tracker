import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';

import bcrypt from 'bcryptjs';
import { userModel } from '../Models/UserModel.ts';

/*

/login
/logout
/register
/me

*/

interface IUserController {
    register: RequestHandler;
    login: RequestHandler;
    logout: RequestHandler;
    me: RequestHandler;
}

export const userController: IUserController = {
    register: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // TODO: add validation

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await userModel.register(username, hashedPassword);

            if(!newUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User was not created!'
                });
            }

            return res.status(201).json({
                success: true,
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                }
            });

        } catch(error) {
            res.status(500).json({
                message: 'Error creating user. Try again later.'
            });
        }
    },

    login: async (req: Request, res: Response) => {
        try {

        } catch(error) {

        }
    },

    logout: async (req: Request, res: Response) => {
        try {

        } catch(error) {

        }
    },

    me: async (req: Request, res: Response) => {
        try {
            res.status(200).json({
                success: true,
                user: {
                    username: 'user001'
                }
            });
        } catch(error) {
            res.status(400).json({ success: false, message: 'Failed to fetch user' });
        }
    }
};

export default userController;
