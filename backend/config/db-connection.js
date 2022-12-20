const mariadb = require('mariadb/callback')
require('dotenv').config()

const dbCon = mariadb.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5
})
dbCon.connect((err, conn) => {
  if (err) {
    console.log('Connetion Failed! ' + err)
    process.exit();
  } else {
    console.log('connected! Connection id is: ' + conn.threadId)
  }
})

module.exports = dbCon
