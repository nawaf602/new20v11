import { Request, Response, NextFunction } from "express";
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
export declare const authorize: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: string;
            };
        }
    }
}
