//include the module
var serialgps = require('serialgps');

//create a new instance. arguments are serial port and baud rate
var gps = new serialgps('/dev/ttyACM1',9600);

//monitor for data
gps.on('data', function(data) {
    console.log(data);
});