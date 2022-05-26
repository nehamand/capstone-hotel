import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const isAdminMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError("Only admin can access this route", 401);
  }

  return next();
};
export default isAdminMiddleware;
