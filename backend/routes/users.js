var express = require('express');
var router = express.Router();
var db_con = require('../db-connection');
var saltHash = require('password-salt-and-hash')
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt'); // bcrypt
const speakeasy = require('speakeasy')
const QRCode = require('qrcode');

var transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/userData/:user', function (req, res) {
  sql = `SELECT user_ID, fName, nName, Gender, Birthday, Email, MobileNr, (SELECT User_Blob FROM userpicture WHERE User_ID = user.user_ID) AS User_Blob FROM user WHERE Email = ?;`,
    db_con.query(sql, [req.params.user], (err, json) => {
      if (err) {
        res.status(500).json({ "error": err.message });
        return;
      }
      res.send(json[0])
    });
})
router.get('/card/:userID', (req, res, next) => {

  var sql = `SELECT (SELECT fName FROM user WHERE user_id = payment_methode.user_id)AS user_fName,(SELECT nName FROM user WHERE user_id = payment_methode.user_id)AS user_lName,(SELECT bank_name FROM bank WHERE bank_id=payment_methode.bank_id)AS Bank_Name,(SELECT bank_logo FROM bank WHERE bank_id=payment_methode.bank_id)AS Bank_Logo,payment_methode_id, card_number, expiration_date_month, expiration_date_year, cardholde, cvc FROM payment_methode WHERE user_id = ?;`
  db_con.query(
    sql,
    [req.params.userID],
    (err, json) => {
      if (err) {
        console.log({ "error": err.message })
        return;
      }
      var hash = json.card_number
      console.log(json, hash)
      res.json(json)
    });
})
router.get('/credit/:userID', (req, res, next) => {

  var sql = `SELECT * FROM credit WHERE user_id = ?;`
  db_con.query(
    sql,
    [req.params.userID],
    (err, json) => {
      if (err) {
        console.log({ "error": err.message })
        return;
      }
      console.log(json[0])
      res.json(json[0])
    });
})
router.get('/billing/:userID', (req, res, next) => {

  var sql = `SELECT billing_id, (SELECT fName FROM user WHERE user_id = billing.user_id) AS fName,(SELECT nName FROM user WHERE user_id = billing.user_id) AS lName, (SELECT duration FROM ride WHERE ride_id = billing.ride_id) AS duration, cost FROM billing WHERE user_id = ?;`
  db_con.query(
    sql,
    [req.params.userID],
    (err, json) => {
      if (err) {
        console.log({ "error": err.message })
        return;
      }
      console.log(json)
      res.json(json)
    });
})
router.get('/bank', (req, res, next) => {

  var sql = `SELECT * FROM bank;`
  db_con.query(
    sql,
    (err, json) => {
      if (err) {
        console.log({ "error": err.message })
        return;
      }
      console.log(json)
      res.json(json)
    });
})

router.post('/create', function (req, res) {
  let nName = req.body.fName;
  let lName = req.body.nName;
  let Gender = req.body.Gender;
  let Birthday = req.body.Birthday;
  let MobileNr = req.body.Number;
  let Email = req.body.Email;
  let pictureBlob = req.body.pictureBlob;
  let name = req.body.fName + " " + req.body.nName;
  var password = req.body.Password;

  sql1 = "INSERT INTO user (fName, nName, Gender, Birthday, Email, MobileNr) VALUES (?, ?, ?, ?, ?, ?);"
  sql2 = 'INSERT INTO login (user_id, psw) VALUES ((SELECT user_id FROM user WHERE Email = ?), ?)'
  sql3 = 'INSERT INTO userpicture (User_Blob, User_ID) VALUES (?, (SELECT user_ID FROM user WHERE EMAIL=?));',
    sql4 = 'INSERT INTO credit (quantity, user_id) VALUES (20.00, ?)'
  db_con.query(
    sql1, [nName, lName, Gender, Birthday, Email, MobileNr],
    (err, result) => {
      if (err) {
        console.log({ "error": err.message });
        return;
      }
      console.log(result);
      if (result.insertId > 0) {
        db_con.query(
          sql4,
          [result.insertId],
          (err, result) => {
            if (err) {
              console.log({ "error": err.message });
              return;
            }
            console.log(result);
          }
        );
        db_con.query(
          sql3,
          [pictureBlob, Email],
          (err, result) => {
            if (err) {
              console.log({ "error": err.message });
              return;
            }
            console.log(result);
          }
        );
        const saltRounds = 10;
        if (password.length > 0) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              // returns hash
              console.log(hash);
              db_con.query(
                sql2,
                [Email, hash],
                (err, result) => {
                  if (err) {
                    console.log({ "error": err.message })
                    return;
                  };
                  console.log('result', result);
                  const secret = speakeasy.generateSecret({
                    issuer: 'Scooter GmbH',
                    name: 'Scooter GmbH | ' + Email
                  });
                  console.log('secret', secret.otpauth_url)
                  QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
                    console.log(data_url);
                    db_con.query(
                      'INSERT INTO otp (user_id, secret, qrCode, ascii) VALUES ((SELECT user_ID FROM user WHERE Email = ?), ?, ?, ?);',
                      [Email, secret, data_url, secret.ascii],
                      (err, result) => {
                        if (err) {
                          console.log({ "error": err.message })
                          return;
                        }
                        console.log(result)
                      }
                    )
                  });

                }
              )
            });
          });

          var mailOptions = {
            from: `ScooTec GmbH` + process.env.MAIL_NAME,
            to: Email,
            subject: 'Welcome!',
            text: 'Your account have been Created!',
            html: `<div style={{ margin: "1em", padding: "1em", textAlign: "left" }}>
                  <p>Dear ${name},</p><br />
                  <p>Your Registrations Is now finish and you can Enjoy your rides now!</p><p>As a small welcome gift you will receive credit in the amount of 20.00€.</p><p>your Scooter GmbH Team</p><div style="height: 5em; textAlign: center;" }}>
                  <img src="cid:logo" style=" margin-top: 0%; max-height:5em; transform: scale(0.25);"/></div></div>`,
            attachments: [{
              filename: 'logo.png',
              path: '/home/noerkel/testnoerkel/noerkelIT/frontend/src/img/logo.png',
              cid: 'logo'
            }]

          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
      } else {
        console.log('Fail!')
      }
    }
  );
});
router.post('/createPaymentMethode', function (req, res) {
  let bank = req.body.bank;
  let cardNumber = req.body.cardNumber;
  let expirationDateMonth = req.body.expirationDateMonth;
  let expirationDateYear = req.body.expirationDateYear;
  let cardholde = req.body.cardholde;
  let userId = req.body.user

  db_con.query(
    'INSERT INTO payment_methode (user_id, bank_id, card_number, expiration_date_month, expiration_date_year, cardholde) VALUES (?,?,?,?,?,?);',
    [userId, bank, cardNumber, expirationDateMonth, expirationDateYear, cardholde],
    (err, result) => {
      if (err) {
        console.log({ "error": err.message });
        return;
      }
      console.log(result);
    }
  );
});
router.post('/UploadPicture', function (req, res) {
  let pictureBlob = req.body.pictureBlob;
  let email = req.body.email;

  db_con.query(
    'INSERT INTO userpicture (User_Blob, User_ID) VALUES (?, (SELECT user_ID FROM user WHERE EMAIL=?));',
    [pictureBlob, email],
    (err, result) => {
      if (err) {
        console.log({ "error": err.message });
        return;
      }
      console.log(result);
    }
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
});
router.post('/ride', function (req, res) {
  let time = req.body.time;
  let scoterId = req.body.scoterId;

  db_con.query(
    'INSERT INTO ride (duration, scoter_id) VALUES (?,?);',
    [time, scoterId],
    (err, result) => {
      if (err) {
        console.log({ "error": err.message });
        return;
      }
      console.log('result', result.insertId);
      res.send(result.insertId.toString())
    }
  );
});
router.post('/billing', function (req, res) {
  let userId = req.body.userId;
  let rideId = req.body.rideId;
  let cost = req.body.cost;
  let driveMinutes = req.body.driveMinutes;

  db_con.query(
    'SELECT quantity FROM credit WHERE user_id =?',
    [userId],
    (err, json) => {
      if (err) {
        console.log({ "error": err.message });
        return;
      }
      console.log(json[0].quantity)
      let costValue = json[0].quantity - cost;
      db_con.query(
        'UPDATE credit SET quantity= ? WHERE user_id = ?',
        [costValue, userId],
        (err, result) => {
          if (err) {
            console.log({ "error": err.message });
            return;
          }
          console.log(result)
        }
      )
    }

  )
  db_con.query(
    'INSERT INTO billing (user_id, ride_id, cost) VALUES (?,?,?);',
    [userId, rideId, cost],
    (err, result) => {
      if (err) {
        console.log({ "error": err.message });
        return;
      }
      console.log(result.insertId);
      if (result.insertId != 0) {
        sql = 'SELECT * FROM user WHERE user_id = ?;'
        db_con.query(
          sql,
          [userId],
          (err, json) => {
            if (err) {
              console.log({ "error": err.message });
              return;
            }
            console.log(json[0]);
            let name = json[0].fName + ' ' + json[0].nName;
            let Email = json[0].Email
            var mailOptions = {
              from: `ScooTec GmbH` + process.env.MAIL_NAME,
              to: Email,
              subject: 'Thanks for the Ride!',
              text: 'See the Billing Information!',
              html: `<div style={{ margin: "1em", padding: "1em", textAlign: "left" }}>
                    <p>Dear ${name},</p><br />
                    <p>Thank you for riding with our scooters.</p><p>Your driving time was ${driveMinutes} Minutes and its just cost ${cost}€.</p><p>your Scooter GmbH Team</p><p>You can find the invoice in the app!</p><div style="height: 5em; textAlign: center;" }}>
                    <img src="cid:logo" style=" margin-top: 0%; max-height:5em; transform: scale(0.25);"/></div></div>`,
              attachments: [{
                filename: 'logo.png',
                path: '/home/noerkel/testnoerkel/noerkelIT/frontend/src/img/logo.png',
                cid: 'logo'
              }]

            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }
        )
      }
    }
  );
});
router.post('/credit', function (req, res) {
  let userId = req.body.userId;
  let add = req.body.add;

  db_con.query(
    'SELECT quantity FROM credit WHERE user_id =?',
    [userId],
    (err, json) => {
      if (err) {
        console.log({ "error": err.message });
        return;
      }
      console.log('quantity', json[0].quantity, 'add', add)
      const num1 = parseInt(json[0].quantity);
      const num2 = parseInt(add);
      let costValue = num1 + num2;
      db_con.query(
        'UPDATE credit SET quantity= ? WHERE user_id = ?',
        [costValue, userId],
        (err, result) => {
          if (err) {
            console.log({ "error": err.message });
            return;
          }
          console.log(result)
        }
      )
    }
  );
});


module.exports = router;
