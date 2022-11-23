import '../App.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer'
import { UserContext, ScoterContext } from '../component/context';
import StopWatch from '../component/stopwatch';
import scooter from '../img/scooter.png'
export default function Scoter() {
    const [userID, setUserId] = useState()
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [scooterId, setScoterId] = useContext(ScoterContext)
    const [id, setId] = useState()
    const [scoter, setScooter] = useState([])
    const [battery, setBattery] = useState('')
    const [batteryColor, setBatteryColor] = useState("")

    const load = () => {
        console.log(scooterId)
    }
    useEffect(() => {
        setId(scooterId)
        console.warn('scooterId.scooterId', scooterId)
    })
    if (id != scooterId) {
        setId(scooterId)
    }
    if (scoter.length == 0 && id != 0) {
        axios({
            method: "get",
            url: "http://localhost:10000/login/scoter/" + scooterId,
            responseType: "json",
        }).then(function (responseponse) {
            console.log('Get Scoter Data:', responseponse.data)
            setScooter(responseponse.data)
            console.log(scoter)
            setId(scooterId)
            setBattery(responseponse.data.battery + '%')
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
            if (!scoter) {
                console.error("get markerArray failed", reason);
            }
        })
    }

    if (id == 0) {
        return (
            <div
            >
                <h3>Please Choose a Scooter to Continue</h3>
                <div
                    className='scooterAnimationHome'>
                    <div
                        className='startAnimantionContainer'
                    >
                        <div className="clouds"></div>
                        <div className="shadow"></div>
                        <div className='speedArrayContainer'>
                            <div className='speedArray'></div>
                            <div className='speedArray1'></div>
                            <div className='speedArray'></div>
                        </div>
                        <img src={scooter} />
                    </div>
                </div>
            </div>
        )
    }
    if (id != 0) {
        if (id != scooterId) {
            setId(scooterId)
            axios({
                method: "get",
                url: "http://localhost:10000/login/scoter/" + scooterId,
                responseType: "json",
            }).then(function (responseponse) {
                console.log('Get Scoter Data:', responseponse.data)
                setScooter(responseponse.data)
                console.log(scoter)
                setId(scooterId)
                setBattery(responseponse.data.battery + '%')
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
                if (!scoter) {
                    console.error("get markerArray failed", reason);
                }
            })
        }
        if (id == scooterId) {
            return (
                <div>
                    <div>
                        <div
                            className='batteryContainer'
                        >
                            <div className="battery">
                                <div
                                    className='battery-level'
                                    style={{ height: battery, backgroundColor: batteryColor }}
                                >
                                    <br />
                                    <p>{scoter.battery}%</p>
                                </div>
                            </div>
                            <img src={scooter} />
                        </div>
                        <h4>You choose Scooter #{scoter.scooter_id} with {scoter.battery}%</h4>
                    </div>

                    <div
                        className='timerContainer'
                    >
                        <StopWatch
                            scooterId={scooterId}
                        />
                    </div>
                </div>
            )
        }
    }
}
