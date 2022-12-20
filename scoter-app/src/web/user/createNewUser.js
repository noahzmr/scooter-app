import '../../style/App.css'
import React, { useState } from 'react'
import axios from 'axios'
import OtpQR from '../login/qrCode'

function CreateNewUser () {
  const [form1Left, setForm1Left] = useState('40px')
  const [form2Left, setForm2Left] = useState('-450px')
  const [form3Left, setForm3Left] = useState('-450px')
  const [progressStyleWidth, setProgressStyleWidth] = useState('120px')
  const userData = []
  const [name, setname] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [postImage, setPostImage] = useState()
  const [qrCode, setQrCode] = useState(null)

  const handleFileUpload = (e) => {
    setPostImage(e.target.files[0])
  }

  const inputValues = () => {
    const UserValues = {
      name,
      Gender: gender,
      Birthday: birthday,
      Email: email,
      Number: number,
      Password: password
    }
    axios.post(
      'https://localhost:10000/users/create',
      UserValues,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then((res) => {
        setQrCode(res.data.data_url)
        console.log('Success!')
      })
      .catch((error) => { if (error) { console.error('post pb failed', error) } })

    console.log(UserValues)
    console.log('Fetched', userData)
  }

  return (

        <div className="abody">

            {qrCode === null
              ? <div className="abody">
                    <div id="createNewUser">
                        <div className="container">
                            <form id="Form1" style={{ left: form1Left, marginTop: '-3em' }}>
                                <button
                                    className='backBtn'
                                    onClick={() => window.location.reload()}
                                >
                                    <div className="arrow"></div>
                                </button>
                                <h3>Personal data</h3>
                                <input
                                    type="text"
                                    name="name"
                                    id="user_name"
                                    placeholder="Name"
                                    required=""
                                    onChange={e => setname(e.target.value)}
                                    onClick={console.log(postImage)}
                                />

                                <input
                                    type="file"
                                    label="Image"
                                    name="myFile"
                                    accept=".jpeg, .png, .jpg"
                                    onChange={(e) => handleFileUpload(e)}
                                    onClick={console.log(postImage)}
                                />

                                <select
                                    name="gender"
                                    id="gender"
                                    onChange={e => setGender(e.target.value)}
                                >

                                    <option value="" disabled >Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Women</option>
                                </select>
                                <input
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    placeholder="Birthday"
                                    onChange={e => setBirthday(e.target.value)}
                                />
                                <div className="btn-box">
                                    <button type="button" id="next1SignUp" onClick={() => { setForm1Left('-450px'); setForm2Left('40px'); setProgressStyleWidth('240px') }}>Next</button>
                                </div>
                            </form>

                            <form id="Form2" style={{ left: form2Left }}>
                                <h3>Contact Data</h3>
                                <input
                                    type="email"
                                    name="email"
                                    id="emailSignup"
                                    placeholder="Email"
                                    required=""
                                    onChange={e => setEmail(e.target.value)}

                                />
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    id="mobileNumberSignUp"
                                    placeholder="Mobile Number"
                                    onChange={e => setNumber(e.target.value)}
                                />
                                <div className="btn-box">
                                    <button type="button" id="back1" onClick={() => { setForm1Left('40px'); setForm2Left('-450px'); setProgressStyleWidth('120px') }} >Back</button>
                                    <button type="button" id="next2SignUp" onClick={() => { setForm2Left('-450px'); setForm3Left('40px'); setProgressStyleWidth('360px') }}>Next</button>
                                </div>
                            </form>
                            <form id="Form3" style={{ left: form3Left }}>
                                <h3>Password</h3>
                                <input
                                    type='password'
                                    name='password'
                                    id='passwordSignUp'
                                    placeholder='Enter Password'
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <input
                                    type='password'
                                    name='password'
                                    id='passwordSignUpRepid'
                                    placeholder='Repide'
                                />
                                <div className="btn-box">
                                    <button type="button" className='btnActionPrimary' id="back1" onClick={() => { setForm2Left('40px'); setForm3Left('-450px'); setProgressStyleWidth('240px') }} >Back</button>
                                    <button
                                        onClick={inputValues}
                                        type='button'
                                        id='submitSignUp'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <div className="step-row">
                                <div id="progress" style={{ width: progressStyleWidth }}></div>
                                <div className="step-col"><small>Personal data</small></div>
                                <div className="step-col"><small>Contact Data</small></div>
                                <div className="step-col"><small>Password</small></div>
                            </div>
                        </div>
                    </div>
                </div>
              : <div className="container">
                    <div className='loginPage'>
                        <OtpQR qrCode={qrCode} email={email} />
                    </div>
                </div>}
        </div>

  )
}

export default CreateNewUser
