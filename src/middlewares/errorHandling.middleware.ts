import {Request, Response, NextFunction} from "express"
import AppError from "../errors/AppError"

export default function (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
  }

  console.log(error)

  return res.status(500).json({message: "Internal server error!"})
}
