import '../style/App.css'
import React, { useEffect, useState, useContext } from 'react'
import Billing from './payment/billing'
import { UserContext, ScoterContext } from '../services/context'
import Scoter from './scoter'
import FullMap from './map'
import AddCredit from './payment/addCredit'
import Weather from './admin/weather'
import {
  useNavigate
} from 'react-router-dom'

export default function Homepage () {
  const [userId, setUserId] = useState('')
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  const [scooterId] = useContext(ScoterContext)
  /* eslint-enable no-unused-vars */
  const [showTemp, setShowTemp] = useState('none')
  const navigate = useNavigate()

  useEffect(() => {
    if (scooterId === 0) {
      setShowTemp('none')
    } else {
      setShowTemp('Block')
    }
  }, [scooterId])
  useEffect(() => {
    if (userId.length === 0) {
      setUserId(authorisatUser.user_ID)
    }
  }, [])

  const DefaultAvatar = (event) => {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
  }

  if (authorisatUser.Birthday === 'default') {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    console.log('authorisatUser.user_ID', authorisatUser.user_ID, 'userID', userId)
    return (
      <div>
        <div
          className="body"
        >
          <div onClick={() => { navigate('https://localhost:10000/user') }} className='userProfileIcon'>
            <img id="avatarHome" src={'https://localhost:10000/users/picture/' + authorisatUser.user_ID} alt='userProfilePicture' onError={(e) => DefaultAvatar(e)} />
          </div>
          <div
            className='map-container'>
            <FullMap />
          </div>
          <div
            className='containerMain'
          >
            <div className='wallet'>
              <AddCredit />
            </div>
            <div className='wallet'>
              <Scoter />
            </div>
            <div
              className='wallet'
              style={{ display: scooterId !== 0 ? 'block' : 'none' }}
            >
              <div style={{ transform: 'scale(0.75)', marginTop: '-4em', display: showTemp }}>
                <Weather />
              </div>
            </div>
            <div
              className='wallet billing'
            >
              <Billing
                userId={userId}
              />
            </div>
          </div>
        </div >

      </div>
    )
  }
}
