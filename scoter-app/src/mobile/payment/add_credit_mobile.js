import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShowAddCreditContext, CreditAddCostContext, ShowPayPalContext, ShowCheckoutContext, UserContext } from '../../services/context'
import axios from 'axios'

export default function AddCredit () {
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  /* eslint-enable no-unused-vars */
  const [setShowAddCredit] = useContext(ShowAddCreditContext)
  const [creditAdd, setCreditAdd] = useContext(CreditAddCostContext)
  const [showPayPal, setShowShowPayPal] = useContext(ShowPayPalContext)
  const setShowCardPayment = 'none'
  const [chekout, setCheckout] = useContext(ShowCheckoutContext)
  const paypal = useRef()
  const [cardData, setCardData] = useState([])
  const userID = authorisatUser.user_ID
  const [cardId, setCardId] = useState()

  useEffect(() => {
    if (authorisatUser.Birtday !== 'default' && cardData.length === 0) {
      axios({
        method: 'get',
        url: 'https://localhost:10000/users/card/' + userID,
        responseType: 'json'
      }).then((res) => {
        if (res.status !== 200) {
          return
        }
        setCardData(res.data)
        if (!cardId) {
          setCardId({
            cardNr: res.data[0].card_number,
            month: res.data[0].expiration_date_month,
            year: res.data[0].expiration_date_year,
            BankLogo: res.data[0].Bank_Logo,
            Bank_Name: res.data[0].Bank_Name,
            cardholde: res.data[0].cardholde
          })
        }
        console.warn('Get Card Data:', res.data[0])
      }).catch((reason) => {
        if (!cardData) {
          console.error('get cardData failed', reason)
        }
      })
    }
  }, [authorisatUser])

  const updateTheDb = () => {
    const updateCredit = {
      userId: authorisatUser.user_ID,
      add: creditAdd
    }
    axios.post(
      'https://localhost:10000/users/credit',
      updateCredit,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then((res) => {
      console.log(res.data)
    }
    ).catch((reason) => {
      if (!updateCredit) {
        console.error('post failed', reason)
      }
    })
  }
  const payPalRender = () => {
    console.warn('creditAdd', creditAdd)
    if (window.paypalBtn) window.paypalBtn.close()
    window.paypalBtn = window.paypal.Buttons({
      createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: creditAdd
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture()
        console.warn(order)
        if (order.status === 'COMPLETED') {
          updateTheDb()
          setShowShowPayPal('none')
          setCheckout('block')
          setShowAddCredit('none')
          setCreditAdd(0)
        }
      },
      onError: function (err) {
        console.error(err)
      },
      style: {
        color: 'black',
        label: 'checkout',
        layout: 'vertical',
        shape: 'pill'
      }
    })
    window.paypalBtn.render(paypal.current)
  }

  return (
        <div
            className='containerM'
        >
            <button
                className='backBtn'
                onClick={() => { setCheckout('block'); setShowShowPayPal('none'); setShowAddCredit('none') }}
            >
                <div className="arrow"></div>
            </button>
            <br />
            <form
                style={{ display: chekout }}
            >
                <h1>
                    Add Credits to Your Account!
                </h1>
                <p>You can use PayPal!</p>
                <div
                    className="payPalEuro"
                >
                    <input
                        type="number"
                        placeholder="0.00"
                        required
                        name="price"
                        min="0"
                        step="0.01"
                        title="Currency"
                        pattern="^\d+(?:\.\d{1,2})?$"
                        onChange={e => { setCreditAdd(e.target.value) }}
                    />
                    <p>€</p>
                </div>
                <br />

                <div
                    className='btnContainer'
                >
                    <button
                        type="button"
                        onClick={() => { payPalRender(); setShowShowPayPal('block'); setCheckout('none'); setShowCardPayment('none') }}
                    >
                        PayPal
                    </button>
                </div>
            </form>
            <div
                style={{ display: showPayPal }}
            >
                <div ref={paypal}></div>
            </div>
        </div>
  )
}
