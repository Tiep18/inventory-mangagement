import { ParamsDictionary } from 'express-serve-static-core'
import queries from '~/constants/queries'
import pool from '~/db'
import Item from '~/types/item.type'

const itemListService = {
  getAll: async () => {
    const result = await pool.query<Item>(queries.GET_ALL_ITEM_LIST)
    return result.rows
  },

  getItemByID: async (params: ParamsDictionary) => {
    const { id } = params
    const result = await pool.query(queries.GET_ITEM_BY_ID, [id])
    return result.rows[0]
  }
}

export default itemListService
