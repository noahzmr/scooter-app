import '../style/App.css'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import PropTypes from 'prop-types'

export default function ControlButtons (props) {
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
      onClick={props.handleStart}
      id='startRideButton'
    >
      Start the Ride!
    </div>
  )

  const ActiveButtons = (
    <div className="btn-grp">

      <div className={classTwo}
        onClick={props.handlePauseResume}
        id='stopRideButton'
      >
        {props.isPaused ? 'Stop the ride' : 'Make a Break!'}
      </div>
    </div>
  )

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  )
}

ControlButtons.propTypes = {
  handleStart: PropTypes.bool.isRequired,
  handlePauseResume: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired
}
