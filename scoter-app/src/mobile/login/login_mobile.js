import '../../App.css';
import React, { useEffect, useState, useRef, useContext, createContext, useReducer } from 'react';
import axios from 'axios';
import $ from 'jquery';
import OtpQR from './otp_qr_mobile';
import { UserContext } from '../../component/context';
import HomepageMobile from '../home/homepage_mobile';

export default function LoginPageMobile() {

    const [form1Left, setForm1Left] = useState("40px")
    const [form2Left, setForm2Left] = useState("-450px")
    const [form3Left, setForm3Left] = useState("-450px")
    const [progressStyleWidth, setProgressStyleWidth] = useState("120px")
    const [user, setUser] = useState("")
    const [psw, setPsw] = useState("")
    const [warnColor, setWarnColor] = useState("false")
    const [userLogon, setUserLogon] = useState({})
    const [showNotMatch, setShowNotMatch] = useState('none')
    const [tokenAll, setTokenAll] = useState()
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [qrCode, setQrCode] = useState([])
    const [showQrCode, setShowQrCode] = useState('none')
    const [showHomepage, setShowHomepage] = useState('none')
    const [showStart, setShowStart] = useState()

    const inputValues = () => {

        const loginValues = {
            'user': user,
            'psw': psw,
        }
        axios.post(
            'http://localhost:10000/login/auth',
            loginValues,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((responseponse) => {
                console.log('erfolgreich')
                console.log(responseponse.data)
                if (responseponse.data == true) {
                    console.log("next Step")
                    setForm1Left("-450px");
                    setForm2Left("40px");
                    setProgressStyleWidth("240px")
                    setWarnColor('false')
                }
                if (responseponse.data == false) {
                    console.log('somthing went wrong!')
                    setWarnColor(!warnColor)
                    setShowNotMatch('block')
                }
                if (responseponse.data != false && responseponse.data != true) {
                    console.log(responseponse.data)
                    console.log("next Step")
                    setForm1Left("-450px");
                    setForm2Left("40px");
                    setProgressStyleWidth("240px")
                    setWarnColor('false')
                    setQrCode(responseponse.data)
                    setShowQrCode('block')
                }
            }).catch((reason) => {
                console.error("post failed", reason);
            });
        console.log(loginValues)

    }

    const checkOtp = () => {
        const loginValues = {
            'token': tokenAll.toString(),
            'user': user,
        }
        axios.post(
            'http://localhost:10000/login/authToken',
            loginValues,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((responseponse) => {
                console.log('erfolgreich')
                console.log(responseponse.data)
                if (responseponse.data == true) {
                    console.log("next Step")
                    setForm2Left("-450px");
                    setForm3Left("40px");
                    setProgressStyleWidth("360px")
                    LoginUser()
                    setShowHomepage('block')
                    setShowStart('none')
                } else {
                    setWarnColor(!warnColor)
                    setTokenAll("")
                }

            }).catch((reason) => {
                console.error("post failed", reason);
            });
        console.log(loginValues)
    }

    const LoginUser = async () => {
        const person = await (
            await
                axios({
                    method: "get",
                    url: 'http://localhost:10000/users/userData/' + user,
                    responseType: "json"
                })
        )
        console.log('Person Data', person.data)
        setAuthorisatUser(person)
        console.log('Person', person)
        if (authorisatUser) {
            localStorage.setItem('user', JSON.stringify(person))
            console.log(authorisatUser)
        }
    }

    return (
        <div
            className="body"
            onChange={console.log('User Data', userLogon)}

        >
            <div id="loginPage" style={{ display: showStart }}>
                <div className={warnColor ? "containerM" : "containerM false"}>
                    <form id="Form1" style={{ left: form1Left, marginTop: '-3em' }}>
                        <button
                            className='backBtn'
                            onClick={() => window.location.reload()}
                        >
                            <div className="arrow"></div>
                        </button>
                        <h3>Login</h3>
                        {authorisatUser.name}
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-Mail"
                            required=""
                            onChange={e => setUser(e.target.value)}
                            style={{ background: warnColor }}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
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
                                id="next1"
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
                            <OtpQR qrCode={qrCode} />
                        </div>

                        <input onChange={e => setTokenAll(e.target.value)} className='otpFild' type='tel' />

                        <div className="btn-box" style={{ marginLeft: '5vw' }}>
                            <button className='btnActionSecondary' type="button" id="back1" onClick={() => { setForm1Left("40px"); setForm2Left("-450px"); setProgressStyleWidth("120px") }} >Back</button>
                            <button className='btnActionPrimary' type="button" id="next2" onClick={checkOtp}>Next</button>
                        </div>
                    </form>
                    <form id="Form3" >
                    </form>
                    <div className="step-rowM">
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
                <HomepageMobile userLogon={authorisatUser} />
            </div>
        </div >
    )
}

