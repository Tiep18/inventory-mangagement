import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'

const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await validations.run(req)

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(422).json({ errors: errors.mapped() })
  }
}

export default validate
