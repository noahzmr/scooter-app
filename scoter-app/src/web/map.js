import React, { useState, useEffect, useContext } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import '../style/App.css'
import scooter from '../img/scooter.png'
import { UserContext, ScoterContext } from '../services/context'
import axios from 'axios'

export default function FullMap () {
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  const [scooterId, setScoterId] = useContext(ScoterContext)
  /* eslint-enable no-unused-vars */
  const [lat, setLat] = useState(53.551086)
  const [lng, setLng] = useState(9.993682)
  const [markerArray, setMarkerArray] = useState([])
  const [batteryColor, setBatteryColor] = useState('')
  const setStatusText = (t) => (console.log(t))

  const icon = new Icon({
    iconUrl: scooter,
    iconSize: [20, 20],
    className: 'leaflet-div-icon2'
  })

  const userIcon = new Icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    iconSize: [50, 50],
    className: 'leaflet-div-icon'
  })

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatusText('Geolocation is not supported by your browser')
    } else {
      setStatusText('Locating...')
      navigator.geolocation.getCurrentPosition((position) => {
        setStatusText(null)
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      }, () => {
        setStatusText('Unable to retrieve your location')
      })
    }
  }

  useEffect(() => {
    setBatteryColor('#30b455')
    getLocation()
    if (markerArray.length === 0) {
      axios({
        method: 'get',
        url: 'https://localhost:10000/login/scooter',
        responseType: 'json'
      }).then((res) => {
        setMarkerArray(res.data)
        if (res.data.battery >= 40) {
          setBatteryColor('#30b455')
        }
        if (res.data.battery <= 40 && res.data.battery >= 16) {
          setBatteryColor('#EFAF13')
        }
        if (res.data.battery <= 15) {
          setBatteryColor('#e81309')
        }
      }).catch((reason) => {
        if (!markerArray) {
          console.error('get markerArray failed', reason)
        }
      })
    }
  }, [])

  if (markerArray.length !== 0 && lat !== null) {
    return (
      <MapContainer center={[
        lat || 53.551086,
        lng || 9.993682
      ]} zoom={12}
        onClick={() => { getLocation() }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          className='map-tiles'
        />

        {markerArray.map(item => (
          <Marker
            key={item.scooter_id}
            position={[
              item.lat || 53.551086,
              item.lng || 9.993682
            ]}
            id={`scooter_${setScoterId}`}
            icon={icon}
          >
            <Popup
              position={[
                item.lat,
                item.lng
              ]}
            >

              <div
                className="batteryContainer2">
                <h2> Scooter #{item.scooter_id}</h2>
                <div className="battery">
                  <div
                    className='battery-level'
                    style={{ height: item.battery, backgroundColor: batteryColor }}
                  >
                    <br />
                    <p>{item.battery}%</p>
                  </div>
                </div>
                <button
                  onClick={() => setScoterId(item.scooter_id)}
                  id="chooseScooterButton"
                >
                  Choose Scooter!
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        <Marker
          key={authorisatUser.user_ID}
          position={[
            lat,
            lng
          ]}
          icon={userIcon}
        />
      </MapContainer>
    )
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}
