import React, { useState, useEffect, useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from "react-leaflet";
import L, { Icon } from "leaflet";
import '../../App.css';
import scooter from '../../img/scooter.png'
import { UserContext, ScoterContext } from '../../component/context';
import { Buffer } from 'buffer';
import axios from "axios";

export default function FullMapMobile() {
    const [activeScooter, setActiveScooter] = useState(null);
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [scooterId, setScoterId] = useContext(ScoterContext)
    const [status, setStatus] = useState(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [markerArray, setMarkerArray] = useState([])
    const [userId, setUserId] = useState('')
    const [battery, setBattery] = useState('')
    const [batteryColor, setBatteryColor] = useState("")

    const iconSize = [20, 20]
    const zoomIcon = () => {

    }

    const icon = new Icon({
        iconUrl: scooter,
        iconSize: [20, 20],
        className: 'leaflet-div-icon2',
    });

    const userIcon = new Icon({
        iconUrl: Buffer.from(authorisatUser.data.User_Blob).toString(),
        iconSize: [50, 50],
        className: 'leaflet-div-icon',
    })
    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
        setUserId(authorisatUser.user_ID)
    }
    useEffect(() => {
        setBatteryColor('#30b455')
        getLocation();
        if (markerArray.length == 0) {
            axios({
                method: "get",
                url: "http://localhost:10000/login/scooter",
                responseType: "json",
            }).then(function (responseponse) {
                setMarkerArray(responseponse.data)
                if (responseponse.data.battery >= 40) {
                    setBatteryColor('#30b455')
                }
                if (responseponse.data.battery <= 40 && responseponse.data.battery >= 16) {
                    setBatteryColor('#EFAF13')
                }
                if (responseponse.data.battery <= 15) {
                    setBatteryColor('#e81309')
                }
            }).catch((reason) => {
                if (!markerArray) {
                    console.error("get markerArray failed", reason);
                }
            })
        }
    }, [])

    if (markerArray.length != 0 && authorisatUser.data.User_Blob != '' && lat != null) {
        return (
            <MapContainer center={[
                lat || 53.551086,
                lng || 9.993682
            ]} zoom={12}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                />
                {markerArray.map(item => (
                    <Marker
                        key={item.scooter_id}
                        position={[
                            item.lat || 53.551086,
                            item.lng || 9.993682
                        ]}
                        onClick={() => {
                            setActiveScooter(item)
                        }}
                        icon={icon}
                    >
                        <Popup
                            position={[
                                item.lat,
                                item.lng
                            ]}
                            onClose={() => {
                                setActiveScooter(null);
                            }}
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
                                    onClick={() => { setScoterId(item.scooter_id); console.log(item.scooter_id) }}
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
        );
    } else {
        return (
            <div
                style={{ color: "white" }}
            >
                <h1>We are Sorry...</h1>
                <h3>... something went wrong</h3>
                <p>But don't worry, if you hold your phone to the scooter's tag, you can still rent it!</p>
                <p>We can only unfortunately not load the card, the following things may have happened:</p>
                <ul>
                    <li>Your browser does not allow location</li>
                    <li>You need to log in again</li>
                </ul>
            </div>
        )
    }
}
