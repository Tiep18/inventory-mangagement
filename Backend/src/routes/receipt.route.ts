import express from 'express'
import receiptController from '~/controllers/receipt.controller'
import asyncWrapper from '~/utils/asyncWrapper'
import receiptValidation from '~/utils/receiptValidation'

const router = express.Router()

router.get('/', asyncWrapper(receiptController.getAll))
router.get('/:id', asyncWrapper(receiptController.getReceiptById))
router.post(
  '/',
  receiptValidation,
  asyncWrapper(receiptController.insertReceipt)
)

export default router
