import { Request, Response, NextFunction } from "express";
export declare class AppError extends Error {
    statusCode: number;
    code: string;
    isOperational: boolean;
    constructor(message: string, statusCode?: number, code?: string, isOperational?: boolean);
}
export declare const errorHandler: (err: Error | AppError, // Accept generic Error or AppError
req: Request, res: Response, next: NextFunction) => void;
export declare const notFoundHandler: (req: Request, res: Response, next: NextFunction) => void;
