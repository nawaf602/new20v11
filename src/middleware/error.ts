import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// Create custom error class extending Error
export class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, code = "INTERNAL_ERROR", isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Centralized Error Handler Middleware
export const errorHandler = (
  err: Error | AppError, // Accept generic Error or AppError
  req: Request,
  res: Response,
  next: NextFunction // next is required for Express error handlers, even if not used
): void => {
  // Default to 500 if statusCode is not set or if it's a generic Error
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  // Provide a default code if it's a generic Error
  const code = err instanceof AppError ? err.code : "INTERNAL_ERROR";
  // Determine if the error is operational
  const isOperational = err instanceof AppError ? err.isOperational : false;

  // Log the error
  // Log all errors in development, but only operational errors or 500s in production
  if (process.env.NODE_ENV === "development") {
      logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Code:: ${code}, Message:: ${message}`, { stack: err.stack });
  } else {
      // In production, log 500 errors or operational errors
      if (statusCode === 500 || isOperational) {
          logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Code:: ${code}, Message:: ${message}`);
          if (statusCode === 500) logger.error(err.stack); // Log stack for 500 errors
      }
  }

  // Send response to the client
  // Only send operational errors details to the client in production
  if (process.env.NODE_ENV === "production" && !isOperational && statusCode === 500) {
    res.status(500).json({
      status: "error",
      code: "INTERNAL_ERROR",
      message: "Something went very wrong!",
    });
  } else {
    res.status(statusCode).json({
      status: "error",
      code,
      message,
      // Include stack trace only in development mode
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
};

// Not Found Handler Middleware
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  // Create a new AppError for 404
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404, "NOT_FOUND");
  next(error); // Pass the error to the centralized error handler
};

