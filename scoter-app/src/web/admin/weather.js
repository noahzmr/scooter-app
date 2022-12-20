import '../../style/App.css'
import React, { useEffect, useState, useContext } from 'react'
import { ScoterContext } from '../../services/context'
import axios from 'axios'

// Resolves charts dependancy

export default function Weather () {
  const units = {
    Celcius: '°C',
    Fahrenheit: '°F'
  }

  const config = {
    minTemp: -20,
    maxTemp: 50,
    unit: 'Celcius'
  }

  const [height, setHeight] = useState(0)
  const [temperatureValue, setTemperatureValue] = useState()
  /* eslint-disable no-unused-vars */
  const [humidity, setHumidity] = useState()
  const [scooterId, setScoterId] = useContext(ScoterContext)
  /* eslint-enable no-unused-vars */

  const loadValue = () => {
    axios({
      method: 'get',
      url: 'https://localhost:10000/api/temp/' + scooterId,
      responseType: 'json'
    }).then((res) => {
      console.log('temp: ', res.data)
      setHumidity(res.data.hum)
      setTemperature(res.data.temp)
    })
  }
  useEffect(() => {
    loadValue()
  }, [scooterId])

  const setTemperature = (range) => {
    setHeight((range - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + '%')
    setTemperatureValue(range + units[config.unit])
  }

  if (scooterId === 0) {
    return (
      <div></div>
    )
  } else {
    if (humidity === null) {
      return (
        <div>
          <h1> Something went wrong with the Scooter Sensor</h1>
        </div>
      )
    } else {
      return (
        <div id="wrapper">
          <div id="termometer">
            <div id="temperature" style={{ height }} data-value={temperatureValue}></div>
            <div id="graduations"></div>
          </div>

          <div id="playground">
            <div id="range">
              <input id="minTemp" type="text" defaultValue={config.maxTemp} />
              <input id="maxTemp" type="text" defaultValue={config.minTemp} />
            </div>
          </div>
          <p>Humidity: {humidity}%</p>
          <button onClick={loadValue}></button>
        </div >
      )
    }
  }
}
