const express = require('express')
const router = express.Router()
const register = require('./config/prometheus')
const dbCon = require('../config/db-connection')
const moment = require('moment')
const ip = require('ip')

let scooters = {}

function refreshScooter () {
  scooters = {}
  return new Promise((resolve, reject) => {
    dbCon.query(
      'SELECT * FROM scooter;',
      (err, result) => {
        if (err) {
          console.log({ error: err })
          reject(err)
          return
        }
        console.log('Founded Scooters: ', result)
        result.forEach((item) => {
          scooters[item.scooter_id] = item
        })
        console.log('Cashed Scooters: ', scooters)
        resolve(scooters)
      }
    )
  })
}

refreshScooter()
router.get('/', (req, res) => {
  res.send(ip.address())
})

router.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', register.contentType)
  register.metrics().then((metricsBody) => {
    res.end(metricsBody)
  })
})

router.get('/jobs', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('X-Prometheus-Refresh-Interval-Seconds', '15')
  const jobs = []
  refreshScooter().then((data) => {
    for (const id in scooters) {
      const item = scooters[id]
      if (item.ip && item.last_contect) {
        jobs.push({
          targets: [`${item.ip}:9100`],
          labels: {
            scooter_id: '' + item.scooter_id + ''
          }
        })
      }
    }
    res.send(jobs)
    console.log('Prometheus discovery service', jobs)
  })
})

router.post('/registration/:id', (req, res) => {
  const currentTime = moment().format('YYYYMMDDHHmmss')

  console.log(`Get the scooter ${req.params.id} with the id ${req.body.ipAddress}`)
  const check = 'SELECT ip FROM scooter WHERE scooter_id = ?;'
  const updateIP = 'UPDATE scooter SET ip = ?, last_contect = ? WHERE scooter_id =?;'
  const updateConnect = 'UPDATE scooter SET last_contect =? WHERE scooter_id =?;'
  const newScooter = 'INSERT INTO scooter (scooter_id, ip,last_contect) VALUES (?,?,?);'
  const lastRegistration = 'SELECT last_contect FROM scooter WHERE scooter_id = ?;'

  dbCon.query(
    check,
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log({ error: err })
        return
      }
      if (result.length === 0) {
        dbCon.query(
          newScooter,
          [req.params.id, req.body.ipAddress, currentTime],
          (err, result) => {
            if (err) {
              console.log({ error: err })
              return
            }
            res.send('registration you as new Scooter!')
            console.log(result)
          }
        )
      } else {
        if (result[0].ip !== req.body.ipAddress) {
          console.log(`[${req.params.id}] change the IP from ${result[0].ip} to ${req.body.ipAddress}!`)
          dbCon.query(
            updateIP,
            [req.body.ipAddress, currentTime, req.params.id],
            (err, result) => {
              if (err) {
                console.log({ error: err })
                return
              }
              console.log('Updated the IP and last connect!')
              res.send('Updated the IP and last connect!')
            }
          )
        } else {
          dbCon.query(
            lastRegistration,
            [req.params.id],
            (err, result) => {
              if (err) {
                console.log({ error: err })
                return
              }
              const difference = currentTime - result[0].last_contect
              dbCon.query(
                updateConnect,
                [currentTime, req.params.id],
                (err, result) => {
                  if (err) {
                    console.log({ error: err })
                    return
                  }
                  res.send('Updated Time!')
                }
              )
              console.log(`[${req.params.id}]`, {
                'Last Connect': result[0].last_contect,
                'Current Time': currentTime,
                Difference: difference
              })
            }
          )
        }
      }
    }
  )
})

module.exports = router
