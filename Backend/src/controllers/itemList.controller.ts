import { Request, Response } from 'express'
import itemListService from '~/services/itemListService'

const itemListController = {
  getAll: async (req: Request, res: Response) => {
    const result = await itemListService.getAll()
    return res.status(200).json(result)
  },

  getItemById: async (req: Request, res: Response) => {
    const result = await itemListService.getItemByID(req.params)
    return res.status(200).json(result)
  }
}

export default itemListController
