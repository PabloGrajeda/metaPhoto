import { Request, Response } from "express";
import { ErrorHandler } from "../types";

export const errorHandler = (error: ErrorHandler, _req: Request, res: Response) => {
  console.log('Error: ', error)
  const status = error.status || 500

  res.status(status).json({
    message: error.message
  })
}