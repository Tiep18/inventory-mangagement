import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'quanlykho',
  port: 5432,
  host: 'localhost',
  connectionTimeoutMillis: 5000
})

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params)
}
