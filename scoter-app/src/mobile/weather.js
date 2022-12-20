import '../style/App.css'
import React, { useEffect, useState, useContext } from 'react'
import { ScoterContext } from '../services/context'
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

  const setHeight = 0
  const [temperatureValue, setTemperatureValue] = useState()
  const [humidity, setHumidity] = useState()
  const [scooterId] = useContext(ScoterContext)

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://localhost:10000/api/temp/' + scooterId,
      responseType: 'json'
    }).then((res) => {
      console.log('temp: ', res.data[0])
      setHumidity(res.data[0].hum)
      setTemperature(res.data[0].temp)
    })
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
    return (
      <div>
        <p>Temperature: {temperatureValue} C°</p>
        <p>Humidity: {humidity}%</p>
      </div >
    )
  }
}
