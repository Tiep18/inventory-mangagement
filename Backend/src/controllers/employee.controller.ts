import { Request, Response } from 'express'
import employeeService from '~/services/employeeService'

const empployeeController = {
  getAll: async (req: Request, res: Response) => {
    const result = await employeeService.getAll()
    return res.status(200).json(result)
  },

  getEmployeeById: async (req: Request, res: Response) => {
    const result = await employeeService.getEmployeeByID(req.params)
    return res.status(200).json(result)
  }
}

export default empployeeController
