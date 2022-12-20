import '../../style/App.css'
import React, { useState, useContext } from 'react'
import { UserContext, ScoterContext } from '../../services/context'
import FullMapMobile from '../map/map'
import Billing from '../payment/billing_mobile'
import Scooter from '../scooter/scooter'
import AddCredit from '../payment/add_credit_mobile'
import PropTypes from 'prop-types'

export default function HomepageMobile (props) {
  const [userId, setUserId] = useState('')
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  const [scooterId, setScoterId] = useContext(ScoterContext)
  /* eslint-enable no-unused-vars */
  const [showMap, setShowMap] = useState('block')
  const [showWallet, setShowWallet] = useState('none')
  const [showBilling, setShowBilling] = useState('none')

  const map = () => {
    setShowMap('block')
    setShowWallet('none')
    setShowBilling('none')
  }
  const profile = () => {
    setShowMap('none')
    setShowWallet('none')
    setShowBilling('none')
  }
  const wallet = () => {
    setShowMap('none')
    setShowWallet('block')
    setShowBilling('none')
  }
  const billing = () => {
    setShowMap('none')
    setShowWallet('none')
    setShowBilling('block')
  }

  if (authorisatUser.Birthday === 'default') {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    console.log('props.userLogon.data.user_ID', props.userLogon.data.user_ID, 'userID', userId)
    if (userId.length === 0) {
      setUserId(props.userLogon.data.user_ID)
    }
    if (scooterId === 0) {
      return (
        <div
          className="bodyM"
          style={{ display: 'block' }}
        >

          <div className="containerN">
            <input id="toggle" type="checkbox" className='button-toggle' />
            <label className="toggle-container" htmlFor="toggle">
              <span className="button button-toggle"><i className="bi bi-list" id='ham'></i></span>
            </label>
            <nav className="nav">
              <button className="nav-item" onClick={() => map()}><i className="bi bi-map"></i></button>
              <button className="nav-item" onClick={() => profile()}><i className="bi bi-person-circle"></i></button>
              <button className="nav-item" onClick={() => wallet()}><i className="bi bi-wallet2"></i></button>
              <button className="nav-item" onClick={() => billing()}><i className="bi bi-receipt-cutoff"></i></button>
            </nav>
            <h1>ScooTec GmbH</h1>
          </div>
          < div
            className='map-containerM'
            style={{ display: showMap }
            }
          >
            <FullMapMobile />
          </div >
          <div
            className='contentContainer'
            style={{ display: showWallet }}
          >
            <AddCredit />
          </div>
          <div
            className='contentContainer'
            style={{ display: showBilling }}
          >
            <Billing />
          </div>
        </div >
      )
    } else {
      return (
        <div
          className="bodyM"
          style={{ display: 'block' }}
        >

          <div className="containerN">
            <input id="toggle" type="checkbox" className='button-toggle' />
            <label className="toggle-container" htmlFor="toggle">
              <span className="button button-toggle"><i className="bi bi-list" id='ham'></i></span>
            </label>
            <nav className="nav">
              <button className="nav-item" onClick={() => map()}><i className="bi bi-map"></i></button>
              <button className="nav-item" onClick={() => profile()}><i className="bi bi-person-circle"></i></button>
              <button className="nav-item" onClick={() => wallet()}><i className="bi bi-wallet2"></i></button>
              <button className="nav-item" onClick={() => billing()}><i className="bi bi-receipt-cutoff"></i></button>
            </nav>
            <h1>ScooTec GmbH</h1>
          </div>

          < div
            className='map-containerM2'
            style={{ display: showMap }
            }
          >
            <FullMapMobile />
          </div >
          <div
            className='contentContainer'
            style={{ display: showWallet }}
          >
            <AddCredit />
          </div>
          <div
            className='contentContainer'
            style={{ display: showBilling }}
          >
            <Billing />
          </div>
          <div className='scooterContainer'>
            <Scooter />
          </div>
        </div >
      )
    }
  }
}

HomepageMobile.propTypes = {
  userLogon: PropTypes.any.isRequired
}
