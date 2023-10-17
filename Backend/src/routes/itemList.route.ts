import express from 'express'
import itemListController from '~/controllers/itemList.controller'
import asyncWrapper from '~/utils/asyncWrapper'

const router = express.Router()

router.get('/', asyncWrapper(itemListController.getAll))
router.get('/:id', asyncWrapper(itemListController.getItemById))

export default router
