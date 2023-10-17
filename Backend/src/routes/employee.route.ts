import express from 'express'
import empployeeController from '~/controllers/employee.controller'
import asyncWrapper from '~/utils/asyncWrapper'

const router = express.Router()

router.get('/', asyncWrapper(empployeeController.getAll))
router.get('/:id', asyncWrapper(empployeeController.getEmployeeById))

export default router
