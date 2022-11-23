// Serialport version 10.4.0
// @serialport/parser-readline version 10.3.0

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

/* 
Serial Port
*/

//Arduino
let arduino = '/dev/ttyACM0'
let baut_rate = 9600

// Serial Port connection
const arduino_port = new SerialPort({ path: arduino, baudRate: baut_rate })

// Parse Date anbd consle.log it
const arduino_parser = arduino_port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

arduino_parser.on("data", console.log);

/* 
Server
*/
