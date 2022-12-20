const express = require('express')
const app = express()
const port = 9100
const prometheus = require('./prometheus.js')

app.use(express.json())

app.use('/', prometheus)

app.listen(port, () => {
  console.log(`Prometheus listening on port ${port}`)
})
