import queries from '~/constants/queries'
import pool from '~/db'

const checkIfCodeExists = async (code: number) => {
  const result = await pool.query(queries.GET_RECEIPT_BY_CODE, [code])

  if (result.rows.length > 0) throw Error('code already exists')
  return true
}

export default checkIfCodeExists
