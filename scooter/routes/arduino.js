// Serialport version 10.4.0
// @serialport/parser-readline version 10.3.0

const express = require('express')
const router = express.Router()
const axios = require('axios')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const moment = require('moment')
require('dotenv').config()

const server = process.env.SERVER
const id = process.env.ID

const scooterId = id

// Arduino
const arduino = '/dev/ttyACM0'
const bautRate = 9600

// Serial Port connection
const arduinoPort = new SerialPort({ path: arduino, baudRate: bautRate })

// Parse Date anbd consle.log it
const arduinoParser = arduinoPort.pipe(new ReadlineParser())

// Serial port library events Arduino
arduinoPort.on('open', showPortOpen)
arduinoParser.on('data', readSerialData)
arduinoPort.on('close', showPortClose)
arduinoPort.on('error', showError)

// Callback functions Arduino
function showPortOpen () {
  console.log('Serial port open. Data from Arduino rate: ' + arduinoPort.baudRate)
}

async function readSerialData (data) {
  console.log('Serial port open. Read serial data.')

  const json = {}

  const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss')
  json.scooterId = scooterId
  json.dateTime = dateTime
  json.data = `${data}`

  axios.post(
    `http://${server}:10000/api/data`,
    json,
    {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  ).then((res) => {
    console.log('Response Arduino', res.data)
  }
  ).catch((reason) => {
    console.error('post failed', reason)
  })
}

function showPortClose () {
  console.log('Serial port for Arduino closed.')
}

function showError (error) {
  console.log('Serial port for Arduino error: ' + error)
}

module.exports = router
