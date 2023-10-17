import express from 'express'
import warehouseController from '~/controllers/warehouse.controller'
import asyncWrapper from '~/utils/asyncWrapper'

const router = express.Router()

router.get('/', asyncWrapper(warehouseController.getAll))
router.get('/:id', asyncWrapper(warehouseController.getWarehouseById))

export default router
