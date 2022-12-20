// Serialport version 10.4.0
// @serialport/parser-readline version 10.3.0

const express = require('express')
const router = express.Router()
const axios = require('axios')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const moment = require('moment')
const GPS = require('gps')
require('dotenv').config()

const server = process.env.SERVER
const id = process.env.ID
const scooterId = id

// GPS
const gpsModule = '/dev/ttyACM1'
const bautRate = 9600

// Serial Port connection
const port = new SerialPort({ // change path
  path: gpsModule,
  baudRate: bautRate,
  parser: new ReadlineParser()
})

const gps = new GPS()

// Serial port library events raspberry
port.on('open', showPortOpenTwo)
port.on('close', showPortCloseTwo)
port.on('error', showErrorTwo)

// Callback functions GPS
function showPortOpenTwo () {
  console.log('Serial port open. Data from GPS rate: ' + port.baudRate)
}

function showPortCloseTwo () {
  console.log('Serial port for raspberry closed.')
}

function showErrorTwo (error) {
  console.log('Serial port for raspberry error: ' + error)
}

gps.on('data', data => {
  console.log(data)
  if (gps.state.lat === null) {
    console.log('Get GPS Data failed!, MAybe Signal Problem?')
  } else {
    const json = {}

    const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss')
    json.scooterId = scooterId
    json.dateTime = dateTime
    json.data = {
      lat: gps.state.lat,
      lng: gps.state.lon
    }

    axios.post(
      `http://${server}:10000/api/location`,
      json,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    ).then((res) => {
      console.log('Response', res.data)
    }
    ).catch((reason) => {
      console.error('post failed', reason)
    })
  }
})

port.on('data', data => {
  gps.updatePartial(data)
})

module.exports = router
