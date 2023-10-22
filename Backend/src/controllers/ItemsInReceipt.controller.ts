import { Request, Response } from 'express'
import itemsInReceiptService from '~/services/itemsInReceiptService'

const itemsInReceiptController = {
  getAll: async (req: Request, res: Response) => {
    const result = await itemsInReceiptService.getAll()
    return res.status(200).json(result)
  },

  insertItemsInReceipt: async (req: Request, res: Response) => {
    const result = await itemsInReceiptService.insertItemsInReceipt(req.body)
    return res.status(201).json({
      message: 'Inserted items in receipt successfully',
      result: result
    })
  }
}

export default itemsInReceiptController
