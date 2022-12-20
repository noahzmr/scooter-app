import '../../style/App.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../services/context'
import refresh from '../../img/refresh.png'

export default function Billing () {
  const [billingData, setBillingData] = useState([])
  const [userID, setUserId] = useState()
  const [creditData, setCreditData] = useState([])
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  /* eslint-enable no-unused-vars */

  const loadData = () => {
    console.warn(creditData.duration)
    setUserId(authorisatUser.user_ID)
    console.log('authorisatUser.user_ID', authorisatUser.user_ID, 'userID loadData', userID)
    axios({
      method: 'get',
      url: 'https://localhost:10000/users/credit/' + userID,
      responseType: 'json'
    }).then((res) => {
      console.log('Get Billing Data:', res.data)
      setBillingData(res.data)
    }).catch((reason) => {
      if (!billingData) {
        console.error('get billingData failed', reason)
      }
    })
    axios({
      method: 'get',
      url: 'https://localhost:10000/users/billing/' + userID,
      responseType: 'json'
    }).then((res) => {
      console.log('Get Billing Data:', res.data)
      setCreditData(res.data)
    }).catch((reason) => {
      if (!creditData) {
        console.error('get billingData failed', reason)
      }
    })
    console.log('Credit Data', creditData, 'Billing Data', billingData)
  }
  useEffect(() => {
    setUserId(authorisatUser.user_ID)
    console.log('authorisatUser.user_ID', authorisatUser.user_ID, authorisatUser)
    console.log('userID', userID)
    if (authorisatUser.Email !== 'default' && creditData.length === 0 && billingData.length === 0) {
      setUserId(authorisatUser.user_ID)
      axios({
        method: 'get',
        url: 'https://localhost:10000/users/credit/' + userID,
        responseType: 'json'
      }).then((res) => {
        console.log('Get Billing Data:', res.data)
        setBillingData(res.data)
      }).catch((reason) => {
        if (!billingData) {
          console.error('get billingData failed', reason)
        }
      })
      axios({
        method: 'get',
        url: 'https://localhost:10000/users/billing/' + userID,
        responseType: 'json'
      }).then((res) => {
        console.log('Get Billing Data:', res.data)
        setCreditData(res.data)
      }).catch((reason) => {
        if (!creditData) {
          console.error('get billingData failed', reason)
        }
      })
    }
    if (billingData.length === 0) {
      axios({
        method: 'get',
        url: 'https://localhost:10000/users/credit/' + userID,
        responseType: 'json'
      }).then((res) => {
        console.log('Get Billing Data:', res.data)
        setBillingData(res.data)
      }).catch((reason) => {
        if (!billingData) {
          console.error('get billingData failed', reason)
        }
      })
    }
    if (creditData.length === 0) {
      axios({
        method: 'get',
        url: 'https://localhost:10000/users/billing/' + userID,
        responseType: 'json'
      }).then((res) => {
        console.log('Get Billing Data:', res.data)
        setCreditData(res.data)
      }).catch((reason) => {
        if (!creditData) {
          console.error('get billingData failed', reason)
        }
      })
    }
  }, [billingData])
  if (billingData.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
        <button
          onClick={loadData}
          className='icon'
        >
          <img src={refresh} />
        </button>
      </div>
    )
  }
  if (billingData.length !== 0) {
    return (
      <div className='billingContainer'>
        <div className='header'>
          <button
            onClick={loadData}
            className='icon'
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <h3>Credit {billingData.quantity.toFixed(2)}€</h3>
        </div >
        <div className="web">
          <div className="table-header">
            <div className="header__item"><a className="filter__link">Billing ID</a></div>
            <div className="header__item"><a className="filter__link filter__link--number">User</a></div>
            <div className="header__item"><a className="filter__link filter__link--number">Duration</a></div>
            <div className="header__item"><a className="filter__link filter__link--number">Cost</a></div>
          </div>

          <div className="table-content">
            {
              creditData.map(item =>
                <div className="table-row"
                  key={item.billing_id}
                >
                  <div className="table-data">#{item.billing_id}</div>
                  <div className="table-data">{item.name}</div>
                  <div className="table-data">{item.duration} min</div>
                  <div className="table-data">{item.cost.toFixed(2)} €</div>
                </div>
              )
            }
          </div>
        </div>
      </div >
    )
  }
}
