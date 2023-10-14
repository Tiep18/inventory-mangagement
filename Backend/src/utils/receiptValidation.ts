import { checkSchema } from 'express-validator'
import validate from '~/middlewares/validation'
import checkIfCodeExists from './checkIfCodeExists'

const receiptValidation = validate(
  checkSchema({
    deliverId: {
      notEmpty: true,
      isInt: {
        errorMessage: 'deliverId is not a number'
      },
      errorMessage: 'deliverId is required'
    },
    warehouseId: {
      notEmpty: true,
      isInt: {
        errorMessage: 'warehouseId is not a number'
      },
      errorMessage: 'warehouseId is required'
    },
    documenterId: {
      notEmpty: true,
      isInt: {
        errorMessage: 'documenterId is not a number'
      },
      errorMessage: 'documenterId is required'
    },
    headOfAccountingId: {
      notEmpty: true,
      isInt: {
        errorMessage: 'headOfAccountingId is not a number'
      },
      errorMessage: 'headOfAccountingId is required'
    },
    warehouseKeeperId: {
      notEmpty: true,
      isInt: {
        errorMessage: 'warehouseKeeperId is not a number'
      },
      errorMessage: 'warehouseKeeperId is required'
    },
    total: {
      notEmpty: true,
      isNumeric: {
        errorMessage: 'total is not a number'
      },
      errorMessage: 'total is required'
    },
    code: {
      notEmpty: true,
      isInt: {
        errorMessage: 'code requires a random number from 10000 to 99999',
        options: {
          min: 10000,
          max: 99999
        }
      },
      custom: {
        options: checkIfCodeExists
      },
      errorMessage: 'code is required'
    },
    debitAccountId: {
      notEmpty: true,
      isInt: {
        errorMessage: 'debitAccountId is not a number'
      },
      errorMessage: 'debitAccountId is required'
    },
    creditAccountId: {
      notEmpty: true,
      isInt: {
        errorMessage: 'creditAccountId is not a number'
      },
      errorMessage: 'creditAccountId is required'
    },
    createdAt: {
      notEmpty: true,
      isISO8601: {
        errorMessage: 'createdAt is not a IOS8601 datetime'
      },
      errorMessage: 'createdAt is required'
    }
  })
)

export default receiptValidation
