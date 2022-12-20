import '../../style/App.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import $ from 'jquery'
import PropTypes from 'prop-types'

export default function OtpQR (props) {
  $(document).ready(function () {
    $('input').keyup(function () {
      if ($(this).val().length === $(this).attr('maxlength')) {
        $(this).next().focus()
      }
    })
  })

  const [qrCode, setQrCode] = useState(null)
  const [user, setUser] = useState(null)
  // set Props Values
  useEffect(() => {
    if (user !== props.email) {
      setUser(props.email)
    }
    if (qrCode !== props.qrCode) {
      setQrCode(props.qrCode)
      console.log('PROPS', props)
    }
  }, [user])

  const [token1, setToken1] = useState('')
  const [token2, setToken2] = useState('')
  const [token3, setToken3] = useState('')
  const [token4, setToken4] = useState('')
  const [token5, setToken5] = useState('')
  const [token6, setToken6] = useState('')
  const [warnColor, setWarnColor] = useState('false')
  const tokenAll = [
    token1 + token2 + token3 + token4 + token5 + token6
  ]

  const checkOtp = () => {
    const loginValues = {
      token: tokenAll.toString(),
      user
    }
    axios.post(
      'https://localhost:10000/login/authToken',
      loginValues,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then((res) => {
      console.log('erfolgreich')
      console.log(res.data)
      if (res.data === true) {
        console.log('next Step')
        window.location.reload()
      } else {
        setWarnColor(!warnColor)
        setToken1('')
        setToken2('')
        setToken3('')
        setToken4('')
        setToken5('')
        setToken6('')
      }
    }).catch((reason) => {
      console.error('post failed', reason)
    })
    console.log(loginValues)
  }

  if (!props.qrCode) {
    return (<div>There are no OTP User!</div>)
  }
  if (props.qrCode) {
    return (
      <div>
        <div>
          <img
            src={Buffer.from(props.qrCode, '').toString('')}
            alt='QR Code'
          />
          <div
            className='otpCotainer'
          >
            <input
              className='otpFild'
              maxLength={1}
              onChange={e => setToken1(e.target.value)}
              style={{ background: warnColor, color: 'black' }}
              value={token1}
            />
            <input
              className='otpFild'
              maxLength={1}
              onChange={e => setToken2(e.target.value)}
              value={token2}
              style={{ background: warnColor, color: 'black' }}
            />
            <input
              className='otpFild'
              maxLength={1}
              onChange={e => setToken3(e.target.value)}
              value={token3}
              style={{ background: warnColor, color: 'black' }}
            />
            <input
              className='otpFild'
              maxLength={1}
              onChange={e => setToken4(e.target.value)}
              value={token4}
              style={{ background: warnColor, color: 'black' }}
            />
            <input
              className='otpFild'
              maxLength={1}
              onChange={e => setToken5(e.target.value)}
              value={token5}
              style={{ background: warnColor, color: 'black' }}
            />
            <input
              className='otpFild'
              maxLength={1}
              onChange={e => setToken6(e.target.value)}
              value={token6}
              style={{ background: warnColor, color: 'black' }}
            />
          </div>
          <div className="btn-box">
            <button className='btnActionPrimary' type="button" id="next2" onClick={checkOtp}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}
OtpQR.propTypes = {
  qrCode: PropTypes.any.isRequired,
  email: PropTypes.string.isRequired
}
