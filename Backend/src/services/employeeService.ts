import { ParamsDictionary } from 'express-serve-static-core'
import queries from '~/constants/queries'
import pool from '~/db'
import Empployee from '~/types/employee.type'
import Item from '~/types/item.type'

const employeeService = {
  getAll: async () => {
    const result = await pool.query<Empployee>(queries.GET_ALL_EMPLOYEE)
    return result.rows
  },

  getEmployeeByID: async (params: ParamsDictionary) => {
    const { id } = params
    const result = await pool.query(queries.GET_EMPLOYEE_BY_ID, [id])
    return result.rows[0]
  }
}

export default employeeService
