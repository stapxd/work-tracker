import { type Request, type Response, type NextFunction, type RequestHandler } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

interface TokenPayload extends JwtPayload {
  id: number;
}

export const authMiddleware: RequestHandler = function(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtSecret = process.env.JWT_SECRET_KEY;
        console.log("");
        if (!jwtSecret) {
            throw new Error('JWT secret key is missing in environment configuration.');
        }

        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        const accessToken = tokenFromHeader || req.cookies?.accessToken;

        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, jwtSecret) as TokenPayload;
                console.log(decoded.id);
                req.userId = decoded.id;
                return next();
            } catch (err) {
                if (!(err instanceof jwt.TokenExpiredError)) {
                    throw err;
                }
            }
        }

        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Unauthorized. No tokens available' });
        }

        const payload = jwt.verify(refreshToken, jwtSecret) as TokenPayload;

        const newAccessToken = jwt.sign(
            { id: payload.id },
            jwtSecret,
            { expiresIn: '15m' }
        );

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });
        
        res.setHeader('access-token', newAccessToken);
        req.userId = payload.id;
        
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}