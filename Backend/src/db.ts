import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'quanlykho',
  port: 5432,
  host: 'localhost',
  connectionTimeoutMillis: 5000
})

export default pool
