import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  if (err) return res.status(404).json({ error: err.message })
}

export default errorHandler
