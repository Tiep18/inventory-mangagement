import { NextFunction, Request, Response } from 'express'
import receiptService from '~/services/receiptService'

const receiptController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const result = await receiptService.getAll()
    return res.status(200).json(result)
  },

  getReceiptById: async (req: Request, res: Response, next: NextFunction) => {
    const result = await receiptService.getReceiptByID(req.params)
    return res.status(200).json(result)
  },

  insertReceipt: async (req: Request, res: Response, next: NextFunction) => {
    const result = await receiptService.insertReceipt(req.body)
    return res.status(201).json(result)
  }
}

export default receiptController
