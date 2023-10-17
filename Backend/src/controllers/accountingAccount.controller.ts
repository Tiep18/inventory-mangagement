import { Request, Response } from 'express'
import accountingAccountService from '~/services/accountingAccountService'

const accountingAccountController = {
  getAll: async (req: Request, res: Response) => {
    const result = await accountingAccountService.getAll()
    return res.status(200).json(result)
  },

  getAccountingAccountById: async (req: Request, res: Response) => {
    const result = await accountingAccountService.getAccountingAccountByID(
      req.params
    )
    return res.status(200).json(result)
  }
}

export default accountingAccountController
