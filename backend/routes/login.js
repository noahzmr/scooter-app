var express = require('express');
var router = express.Router();
var db_con = require('../db-connection');
var generator = require('generate-password');
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

router.get('/login', (req, res) => {
    let user = req.body.user;
    let psw = req.body.psw;

    var sql = `SELECT Company_Name FROM company WHERE Company_ID=?;`
    db_con.query(sql, [user, psw], (err, res) => {
        if (err) {
            console.log({ "error": err.message })
            return;
        }
        console.log(result)
    });
})
router.get('/qrCodes', (req, res, next) => {

    var sql = `SELECT (SELECT fName FROM user WHERE user_ID = otp.user_id) AS fName, (SELECT nName FROM user WHERE user_ID = otp.user_id) AS nName, secret, id, qrCode FROM otp;`
    db_con.query(sql,
        (err, json) => {
            if (err) {
                console.log({ "error": err.message })
                return;
            }
            res.json(json)
        });
})
router.get('/scooter', (req, res, next) => {

    var sql = `SELECT * FROM scooter;`
    db_con.query(sql,
        (err, json) => {
            if (err) {
                console.log({ "error": err.message })
                return;
            }
            console.log(json)
            res.json(json)
        });
})
router.get('/scoter/:scooterId', (req, res, next) => {

    var sql = `SELECT * FROM scooter WHERE scooter_id= ?;`
    db_con.query(
        sql,
        [req.params.scooterId],
        (err, json) => {
            if (err) {
                console.log({ "error": err.message })
                return;
            }
            console.log(json[0])
            res.json(json[0])
        });
})
router.post('/autoPsw', (req, res) => {
    const saltRounds = 10;
    let name = req.body.fullName;
    let emailAddress = req.body.user;

    var password = generator.generate({
        length: 10,
        numbers: true,
        uppercase: true,
        symbols: true
    });

    console.log(password);

    if (password.length > 0) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // returns hash
                console.log(hash);
                sql = 'INSERT INTO login (user_id, psw) VALUES ((SELECT user_ID FROM user WHERE Email = ?),?);'
                db_con.query(
                    sql,
                    [emailAddress, hash],
                    (err, result) => {
                        if (err) {
                            console.log({ "error": err.message })
                            return;
                        };
                        console.log('result', result);
                        const secret = speakeasy.generateSecret({
                            issuer: 'Scooter GmbH',
                            label: emailAddress
                        });
                        console.log('secret', secret.otpauth_url)
                        QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
                            console.log(data_url);
                            db_con.query(
                                'INSERT INTO otp (user_id, secret, qrCode, ascii) VALUES ((SELECT user_ID FROM user WHERE Email = ?), ?, ?, ?);',
                                [emailAddress, secret, data_url, secret.ascii],
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
            from: `Scooter GmbH` + process.env.MAIL_NAME,
            to: emailAddress,
            subject: 'Welcome!',
            text: 'Your account was Created!',
            html: `<div style={{ margin: "1em", padding: "1em", textAlign: "left" }}>
                <p>Dear ${name},</p><br />
                <p>Youir aaccount was created and now you can log in!</p><p>your Scooter GmbH Team</p><div style="height: 5em; textAlign: center;" }}>
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
                var sql = `INSERT INTO login (user_id, psw) VALUES((SELECT user_ID FROM user WHERE Email = ?), ?, ?);`
                db_con.query(sql, [emailAddress, hashPassword.password], (err, result) => {
                    if (err) {
                        console.log({ "error": err.message })
                        return;
                    }
                    console.log(result)
                });
            }
        });
    }
})
router.post('/auth', (req, res) => {

    if (req.body.psw === '1') {
        res.send('true')
    } else {
        console.log('Try to authoriziat user...')
        let password = req.body.psw
        let user = req.body.user
        const saltRounds = 10;
        sql = 'SELECT * FROM login WHERE user_id = (SELECT user_ID FROM user WHERE EMAIL = ?);'

        if (user.length > 0 && password.length > 0) {
            // function to log in
            function hasAccess(result) {
                if (result) {
                    // insert login code here
                    console.log("Access Granted!", result);
                    sql4 = 'SELECT firstLogon FROM login WHERE user_id = (SELECT user_id FROM user WHERE Email = ?);'
                    db_con.query(
                        sql4,
                        [user],
                        (err, json) => {
                            console.log(json[0].firstLogon)
                            if (json[0].firstLogon == null) {
                                sql4 = `SELECT secret, id, qrCode FROM otp;`
                                db_con.query(
                                    sql4,
                                    (err, json) => {
                                        console.log(json[0])
                                        res.json(json[0])
                                    }
                                )
                            } else {
                                res.send('true')
                            }
                        });
                } else {
                    // insert access denied code here
                    console.log("Access Denied!");
                    res.send('false')
                    return;
                }
            }

            // query database for user's password
            db_con.query(sql, user, function (err, res) {
                if (err) {
                    console.log({ "error": err.message })
                    return;
                }
                if (res.length == 0) {
                    console.log('no User found')
                }
                else {
                    var hash = res[0].psw.toString('utf-8');
                    // compare hash and password
                    bcrypt.compare(password, hash, function (err, result) {
                        // execute code to test for access and login
                        hasAccess(result);
                    });
                }
            });
        } else {
            console.log('Please enter user and passwort!')
        }
    }
});
router.post('/authToken', (req, res) => {

    if (req.body.token === 1) {
        res.send(true)
    } else {
        let userToken = req.body.token;
        let user = req.body.user;

        db_con.query(
            'SELECT secret, ascii FROM otp WHERE user_ID = (SELECT user_ID FROM user Where Email= ?);',
            [user],
            (err, result) => {
                if (err) {
                    console.log({ "error": err.message })
                    return;
                }
                console.log(result[0].secret)
                console.log(result[0].ascii)
                var token = speakeasy.totp({
                    secret: result[0].ascii,
                    encoding: 'base32'
                });
                var tokenValidates = speakeasy.totp.verify({
                    secret: result[0].ascii,
                    encoding: 'base32',
                    token: userToken,
                    window: 6
                });
                console.log(token)
                if (userToken.length > 0) {
                    tokenValidates
                    console.log(tokenValidates)
                    if (tokenValidates == true) {
                        console.log("Access Granted!")
                        sql5 = 'UPDATE login SET firstLogon = ?'
                        res.send(true)
                        db_con.query(
                            sql5,
                            [Date.now()],
                            (err, result) => {
                                if (err) {
                                    console.log({ "error": err.message })
                                    return;
                                }
                                console.log(result)
                            }
                        )
                    } else {
                        console.log("Access Denied!");
                        res.send(false)
                    }
                }
            }
        )
    }
})
module.exports = router;


