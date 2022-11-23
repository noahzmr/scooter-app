var express = require('express');
var router = express.Router();
const axios = require('axios').default;
var db_con = require('../db-connection');

var pi = 'http://10.205.37.148:5003'

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Api' });
});

router.get('/test', function (req, res, next) {
    axios.get(
        pi + '/arduino/test'
    ).then((res) => {
        console.log('Response', res.data)
    }
    ).catch((error) => {
        console.error("Get Data Failed!", error.message);
    })
});
router.get('/temp/:scooterId', function (req, res, next) {
    let scooterId = req.params.scooterId;

    sql = 'SELECT temp, hum, MAX(timestamp_sc) FROM scooter_data_tem_hum WHERE scooter_id = ?'
    db_con.query(
        sql,
        [scooterId],
        (err, json) => {
            if (err) {
                console.log({ "error": err.message })
                return;
            }
            console.log(json)
            res.json(json[0])
        });
});

router.post('/data', function (req, res) {
    let scooter_id = req.body.scooter_id;
    let sensor_data = JSON.parse(req.body.data);
    let timestamp = req.body.dateTime;
    // Gyroskop data
    let gy521 = sensor_data.gy521;
    let ax = gy521.aX;
    let ay = gy521.aY;
    let az = gy521.aZ;
    let gx = gy521.gX;
    let gy = gy521.gY;
    let gz = gy521.gZ;
    // Temp and Humidity Sensor
    let temp_hum = sensor_data.temperature_humidity;
    let temp = temp_hum.temp;
    let hum = temp_hum.humidity;

    console.log({
        time: timestamp,
        sensor: sensor_data
    })
    var sql0 = `INSERT INTO scooter_data_gy521 (scooter_id, timestamp_sc, ax, ay, az, gx, gy, gz) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
    var sql1 = `INSERT INTO scooter_data_tem_hum (scooter_id, timestamp_sc, temp, hum) VALUES (?, ?, ?, ?);`
    db_con.query(
        sql0,
        [scooter_id, timestamp, ax, ay, az, gx, gy, gz],
        (err, res) => {
            if (err) {
                console.log({ "error": err })
                return;
            }
        });
    db_con.query(
        sql1,
        [scooter_id, timestamp, temp, hum],
        (err, res) => {
            if (err) {
                console.log({ "error": err })
                return;
            }
        });
    res.send('Succses')
});

router.post('/location', function (req, res) {
    let scooter_id = req.body.scooter_id;
    let timestamp = req.body.dateTime;
    let lng = req.body.lng;
    let lat = reg.body.lat;

    console.log({
        time: timestamp,
        sensor: sensor_data
    })
    console.log('Data: ', req.body)
    sql = 'UPDATE scooter SET lat = ?, lng = ? WHERE scooter_id = ?;'
    db_con.query(
        sql,
        [lat, lng, scooter_id],
        (err, res) => {
            if (err) {
                console.log({ "error": err })
                return;
            }
        });
    res.send('Succses')
});
module.exports = router;