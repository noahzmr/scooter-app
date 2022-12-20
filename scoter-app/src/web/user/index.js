import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../services/context'
import axios from 'axios'
import Billing from '../payment/billing'
import {
  useNavigate
} from 'react-router-dom'

export default function User () {
  const navigate = useNavigate()
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  /* eslint-enable no-unused-vars */

  const [email, setEmail] = useState('')
  const userId = authorisatUser.user_ID

  const [userName, setUserName] = useState(null)
  const telNumber = '+49151515'

  // toggle betwen edit and show
  const [showEditName, setShowEditName] = useState('none')
  const [showEditEmail, setShowEditEmail] = useState('none')
  const [showEditNumber, setShowEditNumber] = useState('none')
  const [showEditBirthday, setShowEditBirthday] = useState('none')

  // User Values
  const [gender, setGender] = useState(null)
  const [birthday, setBirtday] = useState(null)

  // Load User Values
  const loadUserData = () => {
    axios.get('https://localhost:10000/users/userData/' + authorisatUser.Email)
      .then((res) => {
        console.log('Get user Profile!', res.data)
        setGender(res.data.Gender)
        setEmail(res.data.Email)
        setUserName(res.data.name)
        setBirtday(res.data.Birthday)
      })
      .catch((err) => { if (err) { console.log('Failed Get user Profile!', err.message) } })
  }
  const slectGender = () => {
    if (gender === 'male') {
      return (<i className="bi bi-gender-male"></i>)
    }
    if (gender === 'female') {
      return (<i className="bi bi-gender-female"></i>)
    }
  }

  // Update Values
  const updateUserName = (name) => {
    axios.put('https://localhost:10000/users/username', { user: authorisatUser.user_ID, newName: name })
      .then((res) => { console.log(`Update username to ${name}`, res.data); loadUserData(); setShowEditName('none') })
      .catch((err) => { if (err) { console.log(`Update username to ${name}`, err.message) } })
  }
  const updateGender = (gender) => {
    axios.put('https://localhost:10000/users/gender', { user: authorisatUser.user_ID, gender })
      .then((res) => { console.log(`Update gender to ${gender}`, res.data); loadUserData() })
      .catch((err) => { if (err) { console.log(`Update username to ${gender}`, err.message) } })
  }
  const updateEmail = (email) => {
    axios.put('https://localhost:10000/users/email', { user: authorisatUser.user_ID, email })
      .then((res) => { console.log(`Update Email to ${email}`, res.data); loadUserData(); setShowEditEmail('none') })
      .catch((err) => { if (err) { console.log(`Update Email to ${email}`, err.message) } })
  }
  const updateNumber = (number) => {
    axios.put('https://localhost:10000/users/number', { user: authorisatUser.user_ID, number })
      .then((res) => { console.log(`Update Number to ${number}`, res.data); loadUserData(); setShowEditNumber('none') })
      .catch((err) => { if (err) { console.log(`Update Number to ${number}`, err.message) } })
  }

  const updateBirthday = (birthday) => {
    axios.put('https://localhost:10000/users/birthday', { user: authorisatUser.user_ID, birthday })
      .then((res) => { console.log(`Update Number to ${birthday}`, res.data); loadUserData(); setShowEditBirthday('none') })
      .catch((err) => { if (err) { console.log(`Update Number to ${birthday}`, err.message) } })
  }

  const SignOut = () => {
    window.localStorage.clear()
    navigate('https://localhost:10000/login')
  }

  const deleteUser = () => {
    axios.delete('https://localhost:10000/users/delete/' + authorisatUser.user_ID)
      .then(() => { console.log('Delete User') })
      .catch((err) => { if (err) { console.log('Delete User failed!', err.message) } })
  }
  useEffect(() => {
    loadUserData()
  }, [authorisatUser])

  // Uploade Image Function

  const DefaultAvatar = (event) => {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
  }

  const handleFileUpload = (e) => {
    if (e.target.files.length !== 1) {
      console.warn('no file selected!')
      return
    }
    console.warn(e.target.files[0].type)
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    console.warn('File: ', e.target.files[0])

    try {
      axios.post(
        `https://localhost:10000/users/${userId}/picture`,
        formData,
        {
          headers: {
            'Content-Type': e.target.files[0].type
          }
        }).then((res) => {
        console.log('Buffer from the image:', res.data)
      }).catch((reason) => {
        console.error('post failed', reason)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="body">
      <div onClick={() => { navigate('https://localhost:10000/') }} className='userProfileIcon'>
        <img id="avatar" src={'https://localhost:10000/users/picture/' + userId} alt='userProfilePicture' onError={(e) => DefaultAvatar(e)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr' }}>
        <div>
          <h1>Picture</h1>
          <div>
            <div className='userPicture'>
              <div>
                <img id="avatar" src={'https://localhost:10000/users/picture/' + authorisatUser.user_ID} alt='userProfilePicture' onError={(e) => DefaultAvatar(e)} />
              </div>
              <div className='userPictureHover'>
                <input
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                  onClick={(e) => console.log(e.target.files[0].file)}
                />
                <div>
                  <label htmlFor="upload-photo">
                    <i className="bi bi-camera"></i>
                    <p>Profilbild ändern</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div >
        <div>
          <ul className='profileInformation'>
            <li>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <i className="bi bi-person-bounding-box"></i>
                <h3>Name</h3>
              </div>
              <div>
                {showEditName === 'none'
                  ? <input type='text' className='show' placeholder={userName} readOnly />
                  : <input type='text' placeholder={userName} onKeyDown={e => { e.key === 'Enter' ? updateUserName(e.target.value) : console.log('') }} />}
                <button onClick={() => { showEditName === 'none' ? setShowEditName('block') : setShowEditName('none') }}><i className="bi bi-pencil-square"></i></button>
              </div>
            </li>
            <li>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <i className="bi bi-envelope-at"></i>
                <h3>Email</h3>
              </div>
              <div>
                {showEditEmail === 'none'
                  ? <input type='email' className='show' placeholder={email} readOnly />
                  : <input type='email' placeholder={email} onKeyDown={e => { e.key === 'Enter' ? updateEmail(e.target.value) : console.log('') }} />}
                <button onClick={() => { showEditEmail === 'none' ? setShowEditEmail('block') : setShowEditEmail('none') }}><i className="bi bi-pencil-square"></i></button>
              </div>
            </li>
            <li>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <i className="bi bi-telephone"></i>
                <h3>Number</h3>
              </div>
              <div>
                {showEditNumber === 'none'
                  ? <input type='number' className='show' placeholder={telNumber} readOnly />
                  : <input type='number' placeholder={telNumber} onKeyDown={e => { e.key === 'Enter' ? updateNumber(e.target.value) : console.log('') }} />}
                <button onClick={() => { showEditNumber === 'none' ? setShowEditNumber('block') : setShowEditNumber('none') }}><i className="bi bi-pencil-square"></i></button>
              </div>
            </li>
            <li>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <i className="bi bi-balloon-heart"></i>
                <h3>Birthday</h3>
              </div>
              <div>
                {showEditBirthday === 'none'
                  ? <input type='date' className='show' placeholder={birthday} readOnly />
                  : <input type='date' placeholder={birthday} onKeyDown={e => { e.key === 'Enter' ? updateBirthday(e.target.value) : console.log('') }} />}
                <button onClick={() => { showEditBirthday === 'none' ? setShowEditBirthday('block') : setShowEditBirthday('none') }}><i className="bi bi-pencil-square"></i></button>
              </div>
            </li>
            <li>
              <div>
                <div className="dropdown">
                  <div className='header dropbtn'>{gender === null ? <i className="bi bi-gender-ambiguous"></i> : slectGender()} <h3>Gender</h3></div>
                  <div className="dropdown-content" style={{ background: 'none', boxShadow: 'none' }}>
                    <div onClick={() => { updateGender('male') }} style={{ display: 'flex', flexDirection: 'row', background: 'blue', color: 'white', padding: '5px', borderTopLeftRadius: '1em', borderTopRightRadius: '1em' }}>
                      <div>
                        <i className="bi bi-gender-male"></i>
                      </div>Male
                    </div>
                    <div onClick={() => { updateGender('female') }} style={{ display: 'flex', flexDirection: 'row', background: 'pink', color: 'white', padding: '5px', borderBottomLeftRadius: '1em', borderBottomRightRadius: '1em' }}><div><i className="bi bi-gender-female"></i></div>Female</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <button onClick={SignOut}>Sign Out</button>
          <button id='deleteUserButton' onClick={deleteUser}>Delete</button>
        </div>
      </div>
      <div>
        <Billing
          userId={userId}
        />
      </div>
    </div>
  )
}
