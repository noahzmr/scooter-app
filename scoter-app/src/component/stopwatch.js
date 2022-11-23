import '../App.css';
import React, { useState, useEffect, useContext } from "react";
import Timer from "./Timer";
import ControlButtons from "./ControllerButton";
import axios from 'axios';
import { UserContext } from './context';
import { isMobile } from 'react-device-detect';

export default function StopWatch(props) {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const scoterId = props.scooterId
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [userId, setUserId] = useState()
    const [milliseconds, setMilliseconds] = useState()
    const [billingCost, setBillingCost] = useState()
    const [rideId, setRideId] = useState()
    const [driveMinutes, setDriveMinutes] = useState()
    const [minutes, setMinutes] = useState()
    const [classOne, setClassOne] = useState("stop-watch")
    const [step, setStep] = useState(-1)

    useEffect(() => {
        switch (step) {
            case 1:
                millisecond()
                setStep(2)
            case 2:
                calcCost()
                setStep(3)
                console.log('milliseconds', milliseconds)
            case 3:
                ride()
                setStep(4)
            case 4:
                handleReset()
                setStep(-1)

            default:
                console.log("Unhandled step", step);
        }
    }, [step]);

    useEffect(() => {
        if (isMobile) {
            setClassOne("stop-watchM")
        }
    }, [isMobile])

    useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const calcTime = () => {
        let seconds = Math.floor(milliseconds / 1000).toFixed(2);
        let minutes = Math.floor(seconds / 60).toFixed(2);
        setMinutes(minutes)
    }

    const calcCost = () => {
        let unlockingFee = 0.89;
        let perMinute = 0.18;
        let seconds = Math.floor(milliseconds / 1000).toFixed(2);
        let minutes = Math.floor(seconds / 60).toFixed(2);

        if (minutes == 0) {
            const cost = 1 * perMinute + unlockingFee
            setBillingCost(cost)
            setDriveMinutes(1)
            console.log(billingCost)
        }
        if (minutes != 0) {
            const cost = minutes * perMinute + unlockingFee
            setBillingCost(cost)
            setDriveMinutes(minutes)
            console.log(billingCost)
        }
    }

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
        setStep(1)
    };


    const millisecond = () => {
        setMilliseconds(time)
    }

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    const ride = () => {
        const rideValues = {
            'time': driveMinutes,
            'scoterId': scoterId
        }
        console.log(driveMinutes)
        axios.post(
            'http://localhost:10000/users/ride',
            rideValues,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((responseponse) => {
                console.log('New contract was create!', rideValues)
                console.log(responseponse.data)
                const billingValues = {
                    'userId': authorisatUser.data.user_ID,
                    'rideId': responseponse.data,
                    'cost': billingCost.toFixed(2),
                    'driveMinutes': driveMinutes
                }

                axios.post(
                    'http://localhost:10000/users/billing',
                    billingValues,
                    {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    }).then((responseponse) => {
                        console.log('New Billing was create!', billingValues)
                        console.log('responseponse.data', responseponse.data)
                    }
                    ).catch((reason) => {
                        if (!billingValues) {
                            console.error("post failed", reason);
                        }
                    });
            }
            ).catch((reason) => {
                if (!rideValues) {
                    console.error("post failed", reason);
                }
            });
    }

    return (
        <div className={classOne}>
            <Timer time={time} />
            <ControlButtons
                active={isActive}
                isPaused={isPaused}
                handleStart={handleStart}
                handlePauseResume={handlePauseResume}
                handleReset={handleReset}

            />
        </div>
    );
}

