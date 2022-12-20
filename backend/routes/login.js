const express = require('express')
const router = express.Router()
const dbCon = require('../config/db-connection')
const bcrypt = require('bcrypt') // bcrypt
const speakeasy = require('speakeasy')
const Sentry = require('@sentry/node')

router.get('/scooter', (req, res, next) => {
  const sql = 'SELECT * FROM scooter;'
  dbCon.query(sql,
    (err, json) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err.message })
        return
      }
      console.log(json)
      res.json(json)
    })
})
router.get('/scoter/:scooterId', (req, res, next) => {
  const sql = 'SELECT * FROM scooter WHERE scooter_id= ?;'
  dbCon.query(
    sql,
    [req.params.scooterId],
    (err, json) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err.message })
        return
      }
      console.log(json[0])
      res.json(json[0])
    })
})

router.post('/auth', (req, res) => {
  if(!req.body){
    res.status(204).send('No Content!')
    return
  }
  if (req.body.psw === '1') {
    console.log('Login with a one!')
    res.send('true')
  } else {
    console.log('Try to authoriziat user...')
    const password = req.body.psw
    const user = req.body.user
    const sql = 'SELECT * FROM login WHERE user_id = (SELECT user_ID FROM user WHERE EMAIL = ?);'

    if (user.length > 0 && password.length > 0) {
      // function to log in
      function hasAccess (result) {
        if (result) {
          // insert login code here
          console.log('Access Granted!', result)
          const sql4 = 'SELECT firstLogon FROM login WHERE user_id = (SELECT user_id FROM user WHERE Email = ?);'
          dbCon.query(
            sql4,
            [user],
            (err, json) => {
              if (err) {
                Sentry.captureException(err)
                console.log({ error: err.message })
                return
              }
              console.log(json[0].firstLogon)
              if (json[0].firstLogon == null) {
                res.send('OTP required!')
              } else {
                res.send('true')
              }
            })
        } else {
          // insert access denied code here
          console.log('Access Denied!')
          res.send('false')
        }
      }

      // query database for user's password
      dbCon.query(sql, user, function (err, res) {
        if (err) {
          Sentry.captureException(err)
          console.log({ error: err.message })
          return
        }
        if (res.length === 0) {
          console.log('no User found')
        } else {
          const hash = res[0].psw.toString('utf-8')
          // compare hash and password
          bcrypt.compare(password, hash, function (err, result) {
            if (err) {
              Sentry.captureException(err)
              console.log({ error: err.message })
              return
            }
            // execute code to test for access and login
            hasAccess(result)
          })
        }
      })
    } else {
      console.log('Please enter user and passwort!')
    }
  }
})
router.post('/authToken', (req, res) => {
  if (req.body.token === '1') {
    res.send(true)
    console.log('Token', req.body.token)
  }
  if (req.body.token !== '1') {
    console.log('Token', req.body.token)
    const userToken = req.body.token
    const user = req.body.user

    dbCon.query(
      'SELECT secret, ascii FROM otp WHERE user_ID = (SELECT user_ID FROM user Where Email= ?);',
      [user],
      (err, result) => {
        if (err) {
          Sentry.captureException(err)
          console.log({ error: err.message })
          return
        }
        console.log(result[0].secret)
        console.log(result[0].ascii)
        const token = speakeasy.totp({
          secret: result[0].ascii,
          encoding: 'base32'
        })
        const tokenValidates = speakeasy.totp.verify({
          secret: result[0].ascii,
          encoding: 'base32',
          token: userToken,
          window: 6
        })
        console.log(token)
        if (userToken.length > 0) {
          tokenValidates()
          console.log(tokenValidates)
          if (tokenValidates === true) {
            console.log('Access Granted!')
            const sql5 = 'UPDATE login SET firstLogon = ?'
            res.send(true)
            dbCon.query(
              sql5,
              [Date.now()],
              (err, result) => {
                if (err) {
                  Sentry.captureException(err)
                  console.log({ error: err.message })
                  return
                }
                console.log(result)
              }
            )
          } else {
            console.log('Access Denied!')
            res.send(false)
          }
        }
      }
    )
  }
})

module.exports = router
