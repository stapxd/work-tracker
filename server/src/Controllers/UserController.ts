import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';

import bcrypt from 'bcryptjs';
import { userModel } from '../Models/UserModel.ts';

import jwt from 'jsonwebtoken';

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
                message: 'Error register user. Try again later.'
            });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const user = await userModel.findByUsername(username);

            const isValidPassword = await bcrypt.compare(req.body.password, user.hashed_password);

            if(!isValidPassword) {
                return res.status(400).json({ message: 'Invalid username or password!'});
            }

            const secret = process.env.JWT_SECRET_KEY;

            if (!secret) {
                throw new Error('JWT_SECRET_KEY is not defined in environment variables');
            }

            const accessToken = jwt.sign({
                    id: user.id
                },
                secret,
                {
                    expiresIn: '15m'
                }
            );

            const refreshToken = jwt.sign({
                    id: user.id
                },
                secret,
                {
                    expiresIn: '30d'
                }
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,           
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict',     
                maxAge: 30 * 24 * 60 * 60 * 1000 
            });

            res.status(200).json({
                username: user.username,
                accessToken
            });
        } catch(error) {
            //console.log(error);
            res.status(500).json({
                message: 'Error login. Try again later.'
            });
        }
    },

    logout: async (req: Request, res: Response) => {
        try {
            if(!req.cookies.refreshToken) {
                return res.status(400).json({
                    message: 'Already logged out!'
                });
            }

            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            res.status(200).json({ message: 'Logged out successfully' });
        } catch(error) {
            res.status(500).json({
                message: 'Error logout. Try again later.'
            });
        }
    },

    me: async (req: Request, res: Response) => {
        try {
            if(!req.userId) {
                throw '/me : user id is not set';
            }

            const user = await userModel.findById(req.userId!);
            
            if(!user){
                return res.status(404).json({ message: 'User was not found' });
            }

            const { hashed_password, ...userData } = user;

            res.status(200).json({
                success: true,
                user: userData
            });
        } 
        catch (err) {
            console.log(err);
            res.status(404).json({
                message: 'User was not found!'
            });
        }
    }
};

export default userController;
