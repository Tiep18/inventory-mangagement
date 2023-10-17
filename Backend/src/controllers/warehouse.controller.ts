import { Request, Response } from 'express'
import employeeService from '~/services/employeeService'
import warehouseService from '~/services/warehouseService'

const warehouseController = {
  getAll: async (req: Request, res: Response) => {
    const result = await warehouseService.getAll()
    return res.status(200).json(result)
  },

  getWarehouseById: async (req: Request, res: Response) => {
    const result = await warehouseService.getWarehouseByID(req.params)
    return res.status(200).json(result)
  }
}

export default warehouseController
