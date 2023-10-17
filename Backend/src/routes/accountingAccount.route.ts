import express from 'express'
import accountingAccountController from '~/controllers/accountingAccount.controller'
import itemListController from '~/controllers/itemList.controller'
import asyncWrapper from '~/utils/asyncWrapper'

const router = express.Router()

router.get('/', asyncWrapper(accountingAccountController.getAll))
router.get(
  '/:id',
  asyncWrapper(accountingAccountController.getAccountingAccountById)
)

export default router
