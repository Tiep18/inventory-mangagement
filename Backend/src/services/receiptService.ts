import { NextFunction, Request, Response } from 'express'
import queries from '~/constants/queries'
import * as pool from '~/db'
import Receipt, { ReceiptBody } from '~/types/receipt.type'
import { ParamsDictionary } from 'express-serve-static-core'

const receiptService = {
  getAll: async () => {
    const result = await pool.query(queries.GET_ALL_RECEIPT)
    return result.rows
  },

  getReceiptById: async (params: ParamsDictionary) => {
    const { id } = params
    const result = await pool.query(queries.GET_RECEIPT_BY_ID, [id])
    console.log(result)
    return result.rows[0]
  },

  insertReceipt: async (payload: ReceiptBody) => {
    const {
      code,
      createdAt,
      creditAccountId,
      debitAccountId,
      deliverId,
      documenterId,
      headOfAccountingId,
      total,
      warehouseId,
      warehouseKeeperId
    } = payload
    const result = await pool.query(queries.INSERT_RECEIP, [
      deliverId,
      warehouseId,
      documenterId,
      headOfAccountingId,
      warehouseKeeperId,
      total,
      code,
      createdAt,
      debitAccountId,
      creditAccountId
    ])

    return result.rows[0]
  }
}

export default receiptService
