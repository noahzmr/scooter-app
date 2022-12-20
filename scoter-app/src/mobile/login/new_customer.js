import '../../style/App.css'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CreateNewUserMobile () {
  const [form1Left, setForm1Left] = useState('40px')
  const [form2Left, setForm2Left] = useState('-450px')
  const [form3Left, setForm3Left] = useState('-450px')
  const [progressStyleWidth, setProgressStyleWidth] = useState('120px')
  const authorization = ''
  const department = ''
  const companyData = []
  const position = ''
  const userData = []
  const [name, setname] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const allowLogin = 'false'
  const [password, setPassword] = useState('')
  const setPasswordCheck = ''

  const [postImage, setPostImage] = useState({
    myFile: ''
  })

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setPostImage({ ...postImage, myFile: base64 })
  }

  const inputValues = () => {
    const UserValues = {
      name,
      Gender: gender,
      Birthday: birthday,
      Email: email,
      Number: number,
      pictureBlob: postImage.myFile,
      Password: password
    }
    axios.post(
      'https://localhost:10000/users/create',
      UserValues,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(
      console.log('Success!')
    ).catch((reason) => {
      if (!companyData) {
        console.error('post pb failed', reason)
      }
    })

    console.log(UserValues)
    console.log('Fetched', userData)
  }

  return (

    <div className="body">
      <div id="createNewUser">
        <div className="containerM">
          <form id="Form1" style={{ left: form1Left, marginTop: '-3em' }}>
            <Link to='https://localhost:10000/Start'>
              <button
                className='backBtn'
                type='button'
              >
                <div className="arrow"></div>
              </button>
            </Link>
            <h3>Personal data</h3>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required=""
              onChange={e => setname(e.target.value)}
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
              <button type="button" id="next1" onClick={() => { setForm1Left('-450px'); setForm2Left('40px'); setProgressStyleWidth('240px'); console.log('name: ' + name + ' Gender: ' + gender, ' Birthday: ' + birthday + 'IMG:' + postImage.myFile) }}>Next</button>
            </div>
          </form>

          <form id="Form2" style={{ left: form2Left }}>
            <h3>Contact Data</h3>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required=""
              onChange={e => setEmail(e.target.value)}

            />
            <input
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              placeholder="Mobile Number"
              onChange={e => setNumber(e.target.value)}
            />
            <div className="btn-box">
              <button type="button" id="back1" onClick={() => { setForm1Left('40px'); setForm2Left('-450px'); setProgressStyleWidth('120px') }} >Back</button>
              <button type="button" id="next2" onClick={() => { setForm2Left('-450px'); setForm3Left('40px'); setProgressStyleWidth('360px'); console.log(' Authorization: ' + authorization + ' Position: ' + position + ' Department: ' + department + 'Allow Login: ' + allowLogin) }}>Next</button>
            </div>
          </form>
          <form id="Form3" style={{ left: form3Left }}>
            <h3>Password</h3>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter Password'
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Repide'
              onChange={e => setPasswordCheck(e.target.value)}
            />
            <div className="btn-box">
              <button type="button" className='btnActionPrimary' id="back1" onClick={() => { setForm2Left('40px'); setForm3Left('-450px'); setProgressStyleWidth('240px') }} >Back</button>
              <button
                onClick={inputValues}
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>
          <div className="step-rowM">
            <div id="progress" style={{ width: progressStyleWidth }}></div>
            <div className="step-col"><small>Personal data</small></div>
            <div className="step-col"><small>Contact Data</small></div>
            <div className="step-col"><small>Password</small></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewUserMobile
