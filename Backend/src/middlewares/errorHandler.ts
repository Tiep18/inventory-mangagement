import { NextFunction, Request, Response } from 'express'
import { DatabaseError } from 'pg'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  if (err) {
    if (err instanceof DatabaseError) {
      return res.status(422).json({ error: err.detail })
    }
    return res.status(400).json({ error: err.message })
  }
}

export default errorHandler
