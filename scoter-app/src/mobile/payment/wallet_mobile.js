import '../../style/App.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import { UserContext } from '../../services/context'

export default function Wallet () {
  const [cardData, setCardData] = useState([])
  const [userID, setUserId] = useState()
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  /* eslint-enable no-unused-vars */

  const loadData = () => {
    const userID = authorisatUser.user_ID
    axios({
      method: 'get',
      url: 'https://localhost:10000/users/card/' + userID,
      responseType: 'json'
    }).then((res) => {
      console.log('Get Marker Data:', res.data)
      setCardData(res.data)
    }).catch((reason) => {
      if (!cardData) {
        console.error('get cardData failed', reason)
      }
    })
  }

  useEffect(() => {
    setUserId(authorisatUser.user_ID)
    console.log('authorisatUser.user_ID', authorisatUser.user_ID, 'userID', userID)
    if (authorisatUser.Email === 'default') {
      console.log('no user')
    }
    if (cardData === undefined) {
      console.log('cardData === undefined')
    }
    if (authorisatUser.Email !== 'default') {
      if (cardData !== 'nothing') {
        axios({
          method: 'get',
          url: 'https://localhost:10000/user/card/' + userID + '&rnd=' + Date.now(),
          responseType: 'json',
          headers: [
            { 'Cache-Control': 'max-age:0' },
            { 'Cache-Control': 'no-cache:0' },
            { 'Cache-Control': 'no-store:0' }
          ]
        }).then((res) => {
          if (res.status !== 200) {
            return
          }
          console.log('Get Wallet Card Data:', res.data)
          setCardData(res.data)
          if (res.data.length === 0) {
            setCardData('nothing!')
            console.log(cardData)
            console.log('res.data.length === 0')
          }
          if (res.data === undefined) {
            setCardData('nothing!')
            console.log('res.data === undefined')
          }
          if (res.data === '[]') {
            setCardData('nothing!')
            console.log('res.data === []')
          }
          console.warn('res.data', res.data)
          console.warn(res.status)
        }).catch((reason) => {
          if (!cardData) {
            console.error('get cardData failed', reason)
          }
        })
      }
    }
  }, [authorisatUser])

  if (cardData.length > 0) {
    return (
      <div
        className='walletMultipleCards'
      >
        {cardData.map(item => {
          return (
            <div
              className="card"
              key={item.payment_methode_id}
              id={item.payment_methode_id}
            >

              <figure className="card__figure">
                <img
                  src={Buffer.from(item.Bank_Logo, '').toString('')}
                  className="card__figure--logo"
                />
              </figure>
              <div className="card__reader">
                <div className="card__reader--risk card__reader--risk-one"></div>
                <div className="card__reader--risk card__reader--risk-two"></div>
                <div className="card__reader--risk card__reader--risk-three"></div>
                <div className="card__reader--risk card__reader--risk-four"></div>
              </div>
              <p className="card__number">{Buffer.from(item.card_number, '').toString('')}</p>
              <div className="card__dates">
                <span className="card__dates--first">{item.expiration_date_month}</span>
                <span className="card__dates--first">/</span>
                <span className="card__dates--second">{item.expiration_date_year}</span>
              </div>
              <p className="card__name">{item.cardholde}</p>
              <div className="card__flag">
                <div className="card__flag--globe"></div>
                <div className="card__flag--red"></div>
                <div className="card__flag--yellow"></div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  if (cardData.length === 0) {
    return (
      <div>
        <button
          onClick={loadData}
          className='icon'
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
        <h1>You Dont have any Payment Methode</h1>
      </div>
    )
  }
}
