import { NextFunction, Request, Response } from 'express'
import receiptService from '~/services/receiptService'

const receiptController = {
  getAll: async (req: Request, res: Response) => {
    const result = await receiptService.getAll()
    return res.status(200).json(result)
  },

  getReceiptById: async (req: Request, res: Response) => {
    const result = await receiptService.getReceiptById(req.params)
    return res.status(200).json(result)
  },

  insertReceipt: async (req: Request, res: Response) => {
    const result = await receiptService.insertReceipt(req.body)
    return res
      .status(201)
      .json({ message: 'Inserted receipt successfully', result: result })
  }
}

export default receiptController
