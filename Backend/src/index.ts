import express from 'express'
import receiptRouter from './routes/receipt.route'
import errorHandler from './middlewares/errorHandler'

const port = process.env.PORT || 3005

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/api/v1/receipt', receiptRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log('app listening on port ' + port)
})
