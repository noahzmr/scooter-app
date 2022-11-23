import '../App.css';
import React, { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect';

export default function ControlButtons(props) {
    const [classOne, setClassOne] = useState('btn btn-one btn-start')
    const [classTwo, setClassTwo] = useState('btn btn-one')

    useEffect(() => {
        if (isMobile) {
            setClassOne('btnM btn-one btn-start')
            setClassTwo('btnM btn-one')
        }
    }, [isMobile])

    const StartButton = (
        <div className={classOne}
            onClick={props.handleStart}>
            Start the Ride!
        </div>
    );

    const ActiveButtons = (
        <div className="btn-grp">

            <div className={classTwo}
                onClick={props.handlePauseResume}>
                {props.isPaused ? "Stop the ride" : "Make a Break!"}
            </div>
        </div>
    );

    return (
        <div className="Control-Buttons">
            <div>{props.active ? ActiveButtons : StartButton}</div>
        </div>
    );
}