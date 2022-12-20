const express = require('express')
const router = express.Router()
const dbCon = require('../config/db-connection')
const Sentry = require('@sentry/node')

router.get('/temp/:scooterId', function (req, res, next) {
  const scooterId = req.params.scooterId

  const sql = 'SELECT temp, hum, MAX(timestamp_sc) FROM scooter_data_tem_hum WHERE scooter_id = ?'
  dbCon.query(
    sql,
    [scooterId],
    (err, json) => {
      if (err) {
        console.log({ error: err.message })
        Sentry.captureException(err)
        return
      }
      console.log(json)
      res.json(json[0])
    })
})

router.post('/data', function (req, res) {
  const scooterId = req.body.scooter_id
  const sensorData = JSON.parse(req.body.data)
  const timestamp = req.body.dateTime
  // Gyroskop data
  const gy521 = sensorData.gy521
  const ax = gy521.aX
  const ay = gy521.aY
  const az = gy521.aZ
  const gx = gy521.gX
  const gy = gy521.gY
  const gz = gy521.gZ
  // Temp and Humidity Sensor
  const tempHum = sensorData.temperature_humidity
  const temp = tempHum.temp
  const hum = tempHum.humidity

  console.log({
    time: timestamp,
    sensor: sensorData
  })
  const sql0 = 'INSERT INTO scooter_data_gy521 (scooter_id, timestamp_sc, ax, ay, az, gx, gy, gz) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
  const sql1 = 'INSERT INTO scooter_data_tem_hum (scooter_id, timestamp_sc, temp, hum) VALUES (?, ?, ?, ?);'
  dbCon.query(
    sql0,
    [scooterId, timestamp, ax, ay, az, gx, gy, gz],
    (err, res) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err })
      }
    })
  dbCon.query(
    sql1,
    [scooterId, timestamp, temp, hum],
    (err, res) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err })
      }
    })
  res.send('Succses')
})

router.post('/location', function (req, res) {
  const scooterId = req.body.scooter_id
  const timestamp = req.body.dateTime
  const lng = req.body.lng
  const lat = req.body.lat

  console.log({
    time: timestamp
    // sensor: sensorData
  })
  console.log('Data: ', req.body)
  const sql = 'UPDATE scooter SET lat = ?, lng = ? WHERE scooter_id = ?;'
  dbCon.query(
    sql,
    [lat, lng, scooterId],
    (err, res) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err })
      }
    })
  res.send('Succses')
})
module.exports = router
