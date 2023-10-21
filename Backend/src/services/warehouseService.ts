import { ParamsDictionary } from 'express-serve-static-core'
import queries from '~/constants/queries'
import * as pool from '~/db'
import Warehouse from '~/types/warehouse.type'

const warehouseService = {
  getAll: async () => {
    const result = await pool.query(queries.GET_ALL_WAREHOUSE)
    return result.rows
  },

  getWarehouseByID: async (params: ParamsDictionary) => {
    const { id } = params
    const result = await pool.query(queries.GET_WAREHOUSE_BY_ID, [id])
    return result.rows[0]
  }
}

export default warehouseService
