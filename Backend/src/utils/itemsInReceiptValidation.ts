import { body, checkSchema } from 'express-validator'
import validate from '~/middlewares/validation'

const itemsInReceiptValidation = validate(
  checkSchema({
    '*.itemId': {
      notEmpty: true,
      isInt: {
        errorMessage: 'itemId invalid'
      },
      errorMessage: 'itemId is required'
    },
    '*.receiptId': {
      notEmpty: true,
      isInt: {
        errorMessage: 'receiptId invalid'
      },
      errorMessage: 'receiptId is required'
    },
    '*.quantity': {
      notEmpty: true,
      isInt: {
        options: {
          min: 1
        },
        errorMessage: 'quantity invalid'
      },

      errorMessage: 'quantity is required'
    },
    '*.price': {
      notEmpty: true,
      isInt: {
        options: {
          gt: 0
        },
        errorMessage: 'price invalid'
      },
      errorMessage: 'price is required'
    },
    '*.totalAmount': {
      notEmpty: true,
      isInt: {
        options: {
          gt: 0
        },
        errorMessage: 'totalAmount invalid'
      },
      errorMessage: 'totalAmount is required'
    }
  })
)

export default itemsInReceiptValidation
