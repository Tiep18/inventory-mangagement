import express from 'express'
import itemsInReceiptController from '~/controllers/ItemsInReceipt.controller'
import asyncWrapper from '~/utils/asyncWrapper'
import itemsInReceiptValidation from '~/utils/itemsInReceiptValidation'

const router = express.Router()

router.get('/', asyncWrapper(itemsInReceiptController.getAll))
router.post(
  '/',
  itemsInReceiptValidation,
  asyncWrapper(itemsInReceiptController.insertItemsInReceipt)
)

export default router
