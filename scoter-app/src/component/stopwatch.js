import '../style/App.css'
import React, { useState, useEffect, useContext } from 'react'
import Timer from './Timer'
import ControlButtons from './ControllerButton'
import axios from 'axios'
import { UserContext } from '../services/context'
import { isMobile } from 'react-device-detect'
import PropTypes from 'prop-types'

export default function StopWatch (props) {
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  /* eslint-enable no-unused-vars */
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)
  const scoterId = props.scooterId
  const [billingCost, setBillingCost] = useState()
  const [classOne, setClassOne] = useState('stop-watch')
  const unlockingFee = 0.89
  const perMinute = 0.18

  // Loading View
  useEffect(() => {
    if (isMobile) {
      setClassOne('stop-watchM')
    }
  }, [isMobile])

  // Handle Stopwatch Output
  useEffect(() => {
    let interval = null

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  // Start Timer
  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  // Stop Timer
  const handlePauseResume = () => {
    setIsPaused(!isPaused)
    calcCost(time)
  }

  // End Timer
  const handleReset = () => {
    setIsActive(false)
    setTime(0)
  }

  // Calc Cost and Time from the Ride
  const calcCost = (milliseconds) => {
    const minutes = Math.floor(Math.floor(milliseconds / 1000).toFixed(2) / 60).toFixed(2)
    /* eslint-disable eqeqeq */
    if (minutes == 0) {
      /* eslint-enable eqeqeq */
      const cost = 1 * perMinute + unlockingFee
      setBillingCost(cost)
      ride(1)
      console.log(billingCost)
    }
    /* eslint-disable eqeqeq */
    if (minutes != 0) {
      /* eslint-enable eqeqeq */
      const cost = minutes * perMinute + unlockingFee
      setBillingCost(cost)
      ride(minutes)
      console.log(billingCost)
    }
  }

  // API to the Backend Server
  const ride = (drovedMinutes) => {
    const rideValues = {
      time: drovedMinutes,
      scoterId
    }
    console.log(drovedMinutes)
    axios.post('https://localhost:10000/users/ride', rideValues, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
      .then((res) => {
        console.log('Ride Data!', res.data)
        const billingValues = {
          userId: authorisatUser.user_ID,
          rideId: res.data,
          cost: billingCost.toFixed(2),
          driveMinutes: drovedMinutes
        }
        handleReset()
        axios.post('https://localhost:10000/users/billing', billingValues, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
          .then((res) => { console.log('New Billing was create!', billingValues) })
          .catch((reason) => { if (!billingValues) { console.error('post failed', reason) } })
      })
      .catch((reason) => { if (!rideValues) { console.error('post failed', reason) } })
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
  )
}

StopWatch.propTypes = {
  scooterId: PropTypes.any.isRequired
}
