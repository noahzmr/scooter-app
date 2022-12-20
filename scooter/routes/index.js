const express = require('express')
const router = express.Router()
const axios = require('axios')
const ip = require('ip')
require('dotenv').config()
const Sentry = require('@sentry/node')
const server = process.env.SERVER
const id = process.env.ID
const ipAddress = ip.address()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: `Scooter ${id} with the IP ${ipAddress}` })
})

const contactServer = () => {
  const values = {
    ipAddress
  }
  console.log('Contact Server...')
  axios.post(`http://${server}:9100/registration/${id}`, values)
    .then((res) => { console.log(`Send the ID ${id} to the Server ${server} the IP ${ipAddress}`, res.data) })
    .catch((err) => { if (err) { Sentry.captureException(err); console.log('Failed to send contect the Server!', err.message) } })
}

setInterval(contactServer, 60000 / 6)

module.exports = router
