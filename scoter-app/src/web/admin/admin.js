import '../../App.css';
import React, { useEffect, useState, useRef, useContext, createContext, useReducer } from 'react';
import axios from 'axios';

// Resolves charts dependancy

export default function Admin() {

    const units = {
        Celcius: "°C",
        Fahrenheit: "°F"
    };

    const config = {
        minTemp: -20,
        maxTemp: 50,
        unit: "Celcius"
    };

    const [height, setHeight] = useState(0);
    const [temperatureValue, setTemperatureValue] = useState()
    const [scooterId, setScooterId] = useState(1)
    const [humidity, setHumidity] = useState()

    useEffect(() => {
        axios({
            method: "get",
            url: 'http://localhost:10000/api/temp/' + scooterId,
            responseType: "json"
        }).then((res) => {
            console.log('temp: ', res.data[0])
            setHumidity(res.data[0].hum)
            setTemperature(res.data[0].temp)
        })
    }, [])

    const setTemperature = (range) => {
        setHeight((range - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%");
        setTemperatureValue(range + units[config.unit]);
    }




    return (
        <div id="wrapper">
            <div id="termometer">
                <div id="temperature" style={{ height: height }} data-value={temperatureValue}></div>
                <div id="graduations"></div>
            </div>

            <div id="playground">
                <div id="range">
                    <input id="minTemp" type="text" defaultValue={config.maxTemp} />
                    <input id="maxTemp" type="text" defaultValue={config.minTemp} />
                </div>
            </div>
            <p style={{ color: 'black' }}>Humidity: {humidity}%</p>
        </div >
    );

}