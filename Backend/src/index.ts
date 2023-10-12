import express from 'express'

const port = process.env.PORT || 3005

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log('app listening on port ' + port)
})
