const nodemailer = require('nodemailer')
require('dotenv').config()

console.log('Initializing nodemailer...')

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

module.exports = transporter
