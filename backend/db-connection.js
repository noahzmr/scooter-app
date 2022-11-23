var express = require('express');
const mariadb = require('mariadb/callback');
require('dotenv').config()

const db_con = mariadb.createConnection({
    host:  process.env.DB_HOST, 
    port:  process.env.DB_PORT,
    user:  process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
    connectionLimit: 5
  });
  db_con.connect(err =>{
    if(err){
      console.log('Connetion Failed! '+ err);
    }else{
      console.log('connected! Connection id is: '+ conn.threadId);
    }
  })

module.exports = db_con;
