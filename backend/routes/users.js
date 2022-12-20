const express = require('express')
const router = express.Router()
const dbCon = require('../config/db-connection')
const bcrypt = require('bcrypt') // bcrypt
const speakeasy = require('speakeasy')
const QRCode = require('qrcode')
const Sentry = require('@sentry/node')
const minioClient = require('../config/minio')
const transporter = require('../config/nodemailer')

/* GET user listing. */
router.get('/userData/:user', function (req, res) {
  const sql = 'SELECT user_ID, name, Gender, Birthday, Email, MobileNr FROM user WHERE Email = ?;'
  dbCon.query(sql, [req.params.user], (err, json) => {
    if (err) {
      Sentry.captureException(err)
      res.status(500).json({ error: err.message })
      return
    }
    res.send(json[0])
  })
})

router.get('/credit/:userID', (req, res, next) => {
  const sql = 'SELECT * FROM credit WHERE user_id = ?;'
  dbCon.query(
    sql,
    [req.params.userID],
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
router.get('/billing/:userID', (req, res, next) => {
  const sql = 'SELECT billing_id, (SELECT name FROM user WHERE user_id = billing.user_id) AS name, (SELECT duration FROM ride WHERE ride_id = billing.ride_id) AS duration, cost FROM billing WHERE user_id = ?;'
  dbCon.query(
    sql,
    [req.params.userID],
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

router.post('/create', function (req, res) {
  const name = req.body.name
  const Gender = req.body.Gender
  const Birthday = req.body.Birthday
  const MobileNr = req.body.Number
  const Email = req.body.Email
  const pictureBlob = req.body.pictureBlob
  const password = req.body.Password

  const sql1 = 'INSERT INTO user (name, Gender, Birthday, Email, MobileNr) VALUES ( ?, ?, ?, ?, ?);'
  const sql2 = 'INSERT INTO login (user_id, psw) VALUES ((SELECT user_id FROM user WHERE Email = ?), ?)'
  const sql4 = 'INSERT INTO credit (quantity, user_id) VALUES (20.00, ?)'
  dbCon.query(
    sql1,
    [name, Gender, Birthday, Email, MobileNr],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err.message })
        return
      }
      const userId = result.insertId.toString()
      console.log(result)
      if (result.insertId > 0) {
        dbCon.query(
          sql4,
          [result.insertId],
          (err, result) => {
            if (err) {
              Sentry.captureException(err)
              console.log({ error: err.message })
              return
            }
            console.log(result)
          }
        )

        const saltRounds = 10
        if (password.length > 0) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
              Sentry.captureException(err)
              res.status(500).json({ error: err.message })
              return
            }
            bcrypt.hash(password, salt, function (err, hash) {
              if (err) {
                Sentry.captureException(err)
                res.status(500).json({ error: err.message })
                return
              }
              // returns hash
              console.log(hash)
              dbCon.query(
                sql2,
                [Email, hash],
                (err, result) => {
                  if (err) {
                    Sentry.captureException(err)
                    console.log({ error: err.message })
                    return
                  }
                  console.log('result', result)
                  const secret = speakeasy.generateSecret({
                    issuer: 'Scooter GmbH',
                    name: 'Scooter GmbH | ' + Email
                  })
                  console.log('secret', secret.otpauth_url)
                  QRCode.toDataURL(secret.otpauth_url, function (err, dataUrl) {
                    if (err) {
                      Sentry.captureException(err)
                      res.status(500).json({ error: err.message })
                      return
                    }
                    console.log(dataUrl)
                    dbCon.query(
                      'INSERT INTO otp (user_id, secret, ascii ) VALUES (?,?,?)',
                      [userId, secret, secret.ascii]
                    )
                    res.json({ dataUrl, userId })
                  })
                }
              )
            })
          })

          const mailOptions = {
            from: 'ScooTec GmbH' + process.env.MAIL_NAME,
            to: Email,
            subject: 'Welcome!',
            text: 'Your account have been Created!',
            html: `<div style={{ margin: "1em", padding: "1em", textAlign: "left" }}>
                  <p>Dear ${name},</p><br />
                  <p>Your Registrations Is now finish and you can Enjoy your rides now!</p><p>As a small welcome gift you will receive credit in the amount of 20.00€.</p><p>your Scooter GmbH Team</p><div style="height: 5em; textAlign: center;" }}>
                  <img src="cid:logo" style=" margin-top: 0%; max-height:5em; transform: scale(0.25);"/></div></div>`,
            attachments: [{
              filename: 'logo.png',
              path: './public/img/favicon.png',
              cid: 'logo'
            }]

          }

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
        }
      } else {
        console.log('Fail!')
      }
    }
  )
})

router.post('/ride', function (req, res) {
  const time = req.body.time
  const scoterId = req.body.scoterId

  dbCon.query(
    'INSERT INTO ride (duration, scoter_id) VALUES (?,?);',
    [time, scoterId],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err.message })
        return
      }
      console.log('New Ride:', result.insertId.toString())
      res.send(result.insertId.toString())
    }
  )
})
router.post('/billing', function (req, res) {
  const userId = req.body.userId
  const rideId = req.body.rideId
  const cost = req.body.cost
  const driveMinutes = req.body.driveMinutes

  dbCon.query(
    'SELECT quantity FROM credit WHERE user_id =?',
    [userId],
    (err, json) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err.message })
        return
      }
      console.log(json[0].quantity)
      const costValue = json[0].quantity - cost
      dbCon.query(
        'UPDATE credit SET quantity= ? WHERE user_id = ?',
        [costValue, userId],
        (err, result) => {
          if (err) {
            Sentry.captureException(err)
            console.log({ error: err.message })
            return
          }
          console.log(result)
        }
      )
    }

  )
  dbCon.query(
    'INSERT INTO billing (user_id, ride_id, cost) VALUES (?,?,?);',
    [userId, rideId, cost],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err.message })
        return
      }
      res.send(true)
      console.log(result.insertId)
      if (result.insertId !== 0) {
        const sql = 'SELECT * FROM user WHERE user_id = ?;'
        dbCon.query(
          sql,
          [userId],
          (err, json) => {
            if (err) {
              Sentry.captureException(err)
              console.log({ error: err.message })
              return
            }
            console.log(json[0])
            const name = json[0].name
            const Email = json[0].Email
            const mailOptions = {
              from: 'ScooTec GmbH' + process.env.MAIL_NAME,
              to: Email,
              subject: 'Thanks for the Ride!',
              text: 'See the Billing Information!',
              html: `<div style={{ margin: "1em", padding: "1em", textAlign: "left" }}>
                    <p>Dear ${name},</p><br />
                    <p>Thank you for riding with our scooters.</p><p>Your driving time was ${driveMinutes} Minutes and its just cost ${cost}€.</p><p>your Scooter GmbH Team</p><p>You can find the invoice in the app!</p><div style="height: 5em; textAlign: center;" }}>
                    <img src="cid:logo" style=" margin-top: 0%; max-height:5em; transform: scale(0.25);"/></div></div>`,
              attachments: [{
                filename: 'logo.png',
                path: './public/img/favicon.png',
                cid: 'logo'
              }]

            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response)
              }
            })
          }
        )
      }
    }
  )
})
router.post('/credit', function (req, res) {
  const userId = req.body.userId
  const add = req.body.add

  dbCon.query(
    'SELECT quantity FROM credit WHERE user_id =?',
    [userId],
    (err, json) => {
      if (err) {
        Sentry.captureException(err)
        console.log({ error: err.message })
        return
      }
      console.log('quantity', json[0].quantity, 'add', add)
      const num1 = parseInt(json[0].quantity)
      const num2 = parseInt(add)
      const costValue = num1 + num2
      dbCon.query(
        'UPDATE credit SET quantity= ? WHERE user_id = ?',
        [costValue, userId],
        (err, result) => {
          if (err) {
            Sentry.captureException(err)
            console.log({ error: err.message })
            return
          }
          console.log(result)
        }
      )
    }
  )
})

router.put('/gender', (req, res, next) => {
  const sql = 'UPDATE user SET gender = ? WHERE user_id=?;'
  dbCon.query(
    sql,
    [req.body.gender, req.body.user],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        res.status(500).json({ error: err.message })
        console.log(err)
        return
      }
      console.log(`[System](User) Update the Gender where id ${req.params.user}: `, result.insertId)
      res.send(result.insertId.toString())
    }
  )
})

router.put('/username', (req, res, next) => {
  const sql = 'UPDATE user SET name = ? WHERE user_id=?;'
  dbCon.query(
    sql,
    [req.body.newName, req.body.user],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        res.status(500).json({ error: err.message })
        console.log(err)
        return
      }
      console.log(`[System](User) Update the Username where id ${req.params.id}: `, result.insertId)
      res.send(result.insertId.toString())
    }
  )
})

router.put('/email', (req, res, next) => {
  const sql = 'UPDATE user SET Email = ? WHERE user_id=?;'
  dbCon.query(
    sql,
    [req.body.email, req.body.user],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        res.status(500).json({ error: err.message })
        console.log(err)
        return
      }
      console.log(`[System](User) Update the Email where id ${req.params.id}: `, result.insertId)
      res.send(result.insertId.toString())
    }
  )
})

router.put('/number', (req, res, next) => {
  const sql = 'UPDATE user SET MobileNr = ? WHERE user_id=?;'
  dbCon.query(
    sql,
    [req.body.number, req.body.user],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        res.status(500).json({ error: err.message })
        console.log(err)
        return
      }
      console.log(`[System](User) Update the Email where id ${req.params.id}: `, result.insertId)
      res.send(result.insertId.toString())
    }
  )
})

router.put('/birthday', (req, res, next) => {
  const sql = 'UPDATE user SET Birthday = ? WHERE user_id=?;'
  dbCon.query(
    sql,
    [req.body.birthday, req.body.user],
    (err, result) => {
      if (err) {
        Sentry.captureException(err)
        res.status(500).json({ error: err.message })
        console.log(err)
        return
      }
      console.log(`[System](User) Update the Email where id ${req.params.id}: `, result.insertId)
      res.send(result.insertId.toString())
    }
  )
})

router.post('/:userId/picture', (req, res) => {
  if (req.files === null || req.files === undefined) {
    console.log('[System](Minio) Updateing user Pictuire Failed, no file send!')
    console.log({
      files: req.files,
      params: req.params,
      body: req.body,
      fields: req.fields
    })
    return res.status(204).json({ msg: 'No file uploaded!' })
  }
  console.log('[System](Minio) Updateing user Pictuire...', {
    files: req.files.file,
    params: req.params.userId
  })

  const file = req.files.file
  const sql = 'UPDATE user SET picture = ? WHERE user_id=?;'
  const sqlPicture = 'INSERT INTO users_pictures (filename,content_type,user_id) VALUES (?,?,?);'
  const sqlCheck = 'SELECT COUNT(id) AS counter FROM users_pictures WHERE user_id = ?;'
  const sqlUpdate = 'UPDATE users_pictures SET content_type = ? WHERE user_id = ?; '

  console.log(file.mimetype.split('/')[1])
  console.log(file.path)

  minioClient.putObject('scooter', `user_${req.params.userId}_picture.${file.mimetype.split('/')[1]}`, file.data, (error, etag) => {
    if (error) {
      Sentry.captureException(error)
      return console.log(error)
    }
    console.log(etag)
    console.log('[System](Minio) Checking If it is users first Pictuire...')
    dbCon.query(
      sqlCheck,
      [req.params.userId],
      (err, result) => {
        if (err) {
          Sentry.captureException(err)
          res.status(500).json({ error: err.message })
          console.log(err)
          return
        }
        console.log(result[0].counter)
        if (result[0].counter === 1n) {
          console.log('Update User Picture...')
          dbCon.query(
            sqlUpdate,
            [file.type, req.params.userId],
            (err, result) => {
              if (err) {
                Sentry.captureException(err)
                res.status(500).json({ error: err.message })
                console.log(err)
                return
              }
              res.send(result.insertId.toString())
            }
          )
        }
        if (result[0].counter === 0n) {
          console.log('Set first User Picture...')
          dbCon.query(
            sqlPicture,
            [`user_${req.params.userId}_picture.${file.mimetype.split('/')[1]}`, file.mimetype, req.params.userId],
            (err, result) => {
              if (err) {
                Sentry.captureException(err)
                res.status(500).json({ error: err.message })
                console.log(err)
                return
              }
              dbCon.query(
                sql,
                [result.insertId.toString(), req.params.userId],
                (err, result) => {
                  if (err) {
                    Sentry.captureException(err)
                    res.status(500).json({ error: err.message })
                    console.log(err)
                    return
                  }
                  res.send(result.insertId.toString())
                }
              )
              console.log(`[System](User) Update the Picture where id ${req.params.userId}: `, result.insertId)
            })
        }
      })
  })
})

/* eslint-disable new-cap */
router.get('/picture/:userID', (req, res, next) => {
  const sql = 'SELECT * FROM users_pictures WHERE id = (SELECT picture FROM user WHERE user_id = ?)'

  dbCon.query(
    sql,
    [req.params.userID],
    (err, json) => {
      if (err) {
        Sentry.captureException(err)
        res.status(500).json({ error: err.message })
        console.log(err)
        return
      }
      console.log('PICTURE', json)
      if (json.length === 0) {
        console.log('User have no Profilepicture!')
        res.send('User have no Profilepicture!')
        return
      }
      async function call() {
        const promise = new Promise((resolve, reject) => {
          const Buff = []
          let size = 0
          minioClient.getObject('scooter', json[0].filename)
            .then((dataStream) => {
              dataStream.on('data', (chunk) => {
                Buff.push(chunk)
                size += chunk.length
              })
              dataStream.on('end', () => {
                console.log('[System](MinIO) End. Total size = ' + size)
                //     console.log("[System](MinIO) End Buffer : " + buff)
                const NewBuffer = Buffer.concat(Buff)
                resolve(NewBuffer)
              })
              dataStream.on('error', (err) => {
                console.log('[System](MinIO) error: ', err)
                reject(err)
              })
            })
            .catch((reject) => { return reject })
        })

        return promise
      }
      async function GetData() {
        const data = await call()
          .then((data) => {
            dbCon.query(
              sql,
              [req.params.userID],
              (err, result) => {
                if (err) {
                  Sentry.captureException(err)
                  res.status(500).json({ error: err.message })
                  console.log(err)
                  return
                }
                console.log(result)
                console.log(`[System](User) Get User Profile from the id ${req.params.userID}: `)
                res.setHeader('Content-Type', json[0].content_type)
                res.send(new Buffer.from(data))
              })
          })
        console.log(data)
      }
      GetData()
    }
  )
})

router.delete('/delete/:userID', (req, res, next) => {
  const sql = 'DELETE FROM user WHERE user_id = ?'
  console.log(req.params.userID)
  dbCon.query(
    sql,
    [req.params.userID],
    (err, json) => {
      if (err) {
        Sentry.captureException(err)
        res.status(500).json({ error: err.message })
        console.log(err)
        return
      }
      console.log('Delete User: ', req.params.userID)
    }
  )
})
module.exports = router
/* eslint-enable new-cap */
