import React, { useContext, useRef } from 'react'
import { CreditAddCostContext, ShowPayPalContext, ShowCheckoutContext, UserContext } from '../../services/context'
import axios from 'axios'

export default function AddCredit () {
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  const [creditAdd, setCreditAdd] = useContext(CreditAddCostContext)
  const [showPayPal, setShowShowPayPal] = useContext(ShowPayPalContext)
  const [chekout, setCheckout] = useContext(ShowCheckoutContext)
  /* eslint-enable no-unused-vars */
  const paypal = useRef()

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
    <div>
      <br />
      <form
        style={{ display: chekout }}
      >
        <h3>
          Add Credits to Your Account!
        </h3>
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
            id='paypalAddCredit'
            onChange={e => { setCreditAdd(e.target.value) }}
          />
          <p>€</p>
        </div>
        <div
          className='btnContainer'
        >
          <button
            id='paypalAddCreditButton'
            type="button"
            onClick={() => { payPalRender(); setShowShowPayPal('block'); setCheckout('none') }}
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
