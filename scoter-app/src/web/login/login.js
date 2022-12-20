import '../../style/App.css'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import $ from 'jquery'
import Homepage from '../homepage'
import { UserContext } from '../../services/context'

export default function LoginPage () {
  const [form1Left, setForm1Left] = useState('40px')
  const [form2Left, setForm2Left] = useState('-450px')
  const [progressStyleWidth, setProgressStyleWidth] = useState('120px')
  const [user, setUser] = useState('')
  const [psw, setPsw] = useState('')
  const [token1, setToken1] = useState('')
  const [token2, setToken2] = useState('')
  const [token3, setToken3] = useState('')
  const [token4, setToken4] = useState('')
  const [token5, setToken5] = useState('')
  const [token6, setToken6] = useState('')
  const [warnColor, setWarnColor] = useState('false')
  const userLogon = {}
  const [showNotMatch, setShowNotMatch] = useState('none')
  const tokenAll = [
    token1 + token2 + token3 + token4 + token5 + token6
  ]
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  /* eslint-enable no-unused-vars */
  const setQrCode = []
  const [showQrCode, setShowQrCode] = useState('none')
  const [showHomepage, setShowHomepage] = useState('none')

  const inputValues = () => {
    const loginValues = {
      user,
      psw
    }
    axios.post(
      'https://localhost:10000/login/auth',
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
        setForm1Left('-450px')
        setForm2Left('40px')
        setProgressStyleWidth('240px')
        setWarnColor('false')
      }
      if (res.data === false) {
        console.log('somthing went wrong!')
        setWarnColor(!warnColor)
        setShowNotMatch('block')
      }
      if (res.data !== false && res.data !== true) {
        console.log(res.data)
        console.log('next Step')
        setForm1Left('-450px')
        setForm2Left('40px')
        setProgressStyleWidth('240px')
        setWarnColor('false')
        setQrCode(res.data)
        setShowQrCode('block')
      }
    }).catch((reason) => {
      console.error('post failed', reason)
    })
    console.log(loginValues)
  }

  $(document).ready(function () {
    $('input').keyup(function () {
      if ($(this).val().length === $(this).attr('maxlength')) {
        $(this).next().focus()
      }
    })
  })
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
        setForm2Left('-450px')
        setProgressStyleWidth('360px')
        LoginUser()
        setShowHomepage('block')
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

  const LoginUser = async () => {
    const person = await (
      await
      axios({
        method: 'get',
        url: 'https://localhost:10000/users/userData/' + user,
        responseType: 'json'
      })
    )
    console.log('Person Data', person.data)
    setAuthorisatUser(person.data)
    console.log('Person', person.data)
    if (authorisatUser) {
      localStorage.setItem('user', JSON.stringify(person.data))
      console.log(person.data)
    }
  }

  return (
    <div
      className="body"
      onChange={console.log('User Data', userLogon)}

    >
      <div id="loginPage">
        <div className={warnColor ? 'container' : 'container false'}>
          <form id="Form1" style={{ left: form1Left, marginTop: '-3em' }}>
            <button
              className='backBtn'
              onClick={() => window.location.reload()}
            >
              <div className="arrow"></div>
            </button>
            <h3>Login</h3>
            <input
              type="email"
              name="email"
              id="emailSignIn"
              placeholder="E-Mail"
              required=""
              onChange={e => setUser(e.target.value)}
              style={{ background: warnColor }}
            />
            <input
              type="password"
              name="password"
              id="passwordSignIn"
              placeholder="Password"
              required=""
              onChange={e => setPsw(e.target.value)}
              style={{ background: warnColor }}
            />
            <div
              style={{ display: showNotMatch }}
              className='notMatch'
            >
              <h3>Somthing went wrong!</h3>
              <p>User Name or password does match or exist!</p>
            </div>
            <div className="btn-box">
              <button
                className='btnActionPrimary'
                type="button"
                id="next1SignInButton"
                onClick={inputValues}>Next</button>
            </div>

          </form>

          <form id="Form2" style={{ left: form2Left }}
            onChange={() => { console.log(tokenAll) }}
          >
            <h3>OTP</h3>
            <div
              className='QrCode'
              style={{ display: showQrCode }}
            >
              {/* <OtpQR qrCode={qrCode} userID={user} /> */}
            </div>

            <div
              className='otpCotainer'
            >
              <input
                className='otpFild'
                id='otpFildOne'
                maxLength={1}
                onChange={e => setToken1(e.target.value)}
                style={{ background: warnColor }}
                value={token1}
              />
              <input
                className='otpFild'
                maxLength={1}
                onChange={e => setToken2(e.target.value)}
                value={token2}
              />
              <input
                className='otpFild'
                maxLength={1}
                onChange={e => setToken3(e.target.value)}
                value={token3}
              />
              <input
                className='otpFild'
                maxLength={1}
                onChange={e => setToken4(e.target.value)}
                value={token4}
              />
              <input
                className='otpFild'
                maxLength={1}
                onChange={e => setToken5(e.target.value)}
                value={token5}
              />
              <input
                className='otpFild'
                maxLength={1}
                onChange={e => setToken6(e.target.value)}
                value={token6}
              />
            </div>
            <div className="btn-box">
              <button className='btnActionSecondary' type="button" id="back1" onClick={() => { setForm1Left('40px'); setForm2Left('-450px'); setProgressStyleWidth('120px') }} >Back</button>
              <button className='btnActionPrimary' type="button" id="next2SignIn" onClick={checkOtp}>Next</button>
            </div>
          </form>
          <form id="Form3" >
          </form>
          <div className="step-row">
            <div id="progress" style={{ width: progressStyleWidth }}></div>
            <div className="step-col"><small>Login</small></div>
            <div className="step-col"><small>OTP</small></div>
            <div className="step-col"><small>Checking</small></div>
          </div>
        </div>
      </div >
      <div
        style={{ display: showHomepage }}
      >
        <Homepage
          userLogon={authorisatUser} />
      </div>
    </div >
  )
}
