import { ParamsDictionary } from 'express-serve-static-core'
import queries from '~/constants/queries'
import * as pool from '~/db'
import AccountingAccount from '~/types/accountingAccount.type'

const accountingAccountService = {
  getAll: async () => {
    const result = await pool.query(queries.GET_ALL_ACCOUNTING_ACCOUNT)
    return result.rows
  },

  getAccountingAccountByID: async (params: ParamsDictionary) => {
    const { id } = params
    const result = await pool.query(queries.GET_ACCOUNTING_ACCOUNT_BY_ID, [id])
    return result.rows[0]
  }
}

export default accountingAccountService
