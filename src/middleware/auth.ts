import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error"; // Assuming AppError is defined here
import { logger } from "../utils/logger";

// Interface for JWT payload
interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Authentication middleware
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Authentication token missing", 401, "UNAUTHORIZED");
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (error: unknown) { // Added type annotation here
    // Check if error is an instance of Error to safely access properties
    if (error instanceof Error) {
        if (error.name === "JsonWebTokenError") {
            logger.warn("Invalid JWT token received", { error: error.message });
            next(new AppError("Invalid authentication token", 401, "INVALID_TOKEN"));
        } else if (error.name === "TokenExpiredError") {
            logger.warn("Expired JWT token received", { error: error.message });
            next(new AppError("Authentication token expired", 401, "TOKEN_EXPIRED"));
        } else {
            // Handle other potential errors from jwt.verify or AppError instances
            logger.error("Authentication error:", error);
            next(error); // Pass the original error or a generic one
        }
    } else {
        // Handle non-Error exceptions
        logger.error("Unknown authentication error:", error);
        next(new AppError("An unexpected authentication error occurred", 500, "INTERNAL_SERVER_ERROR"));
    }
  }
};

// Role-based authorization middleware
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError("User not authenticated", 401, "UNAUTHORIZED"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Not authorized to access this resource", 403, "FORBIDDEN"));
    }

    next();
  };
};

// Extend Express Request interface
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

