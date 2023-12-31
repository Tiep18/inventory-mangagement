import express from 'express'
import cors from 'cors'
import receiptRouter from './routes/receipt.route'
import itemListRouter from './routes/itemList.route'
import accountingAccountRouter from './routes/accountingAccount.route'
import itemsInReceiptRouter from './routes/itemsInReceipt.route'
import employeeRouter from './routes/employee.route'
import warehouseRouter from './routes/warehouse.route'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(express.json())

app.use(
  cors({
    // origin: CLIENT_ORIGIN_URL,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400
  })
)

app.use('/api/v1/receipts', receiptRouter)
app.use('/api/v1/items', itemListRouter)
app.use('/api/v1/accounting-accounts', accountingAccountRouter)
app.use('/api/v1/employees', employeeRouter)
app.use('/api/v1/warehouses', warehouseRouter)
app.use('/api/v1/itemsreceipts', itemsInReceiptRouter)
app.use(errorHandler)

const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log('app listening on port ' + port)
})

export default app
