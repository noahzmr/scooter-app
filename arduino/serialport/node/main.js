// Serialport version 10.4.0
// @serialport/parser-readline version 10.3.0

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

//Arduino
let arduino = '/dev/ttyACM0'
let baut_rate = 9600

// Raspberry Parts
var gps = '/dev/ttyACM1';
//Bautrate is same like the arduino

// Serial Port connection
const arduino_port = new SerialPort({ path: arduino, baudRate: baut_rate })
const gps_port = new SerialPort({ path: gps, baudRate: baut_rate })

// Parse Date anbd consle.log it
const arduino_parser = arduino_port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
const gps_parser = gps_port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

arduino_parser.on("data", console.log);
gps_parser.on('data', console.log)

