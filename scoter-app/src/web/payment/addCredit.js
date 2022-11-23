import React, { useContext, useEffect, useState, useRef } from "react";
import { ShowAddCreditContext, CreditAddCostContext, ShowPayPalContext, ShowCheckoutContext } from '../../component/context';
import { UserContext } from '../../component/context';
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { Buffer } from 'buffer'

export default function AddCredit() {
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [showAddCredit, setShowAddCredit] = useContext(ShowAddCreditContext)
    const [creditAdd, setCreditAdd] = useContext(CreditAddCostContext)
    const [showPayPal, setShowShowPayPal] = useContext(ShowPayPalContext)
    const [showCardPayment, setShowCardPayment] = useState('none')
    const [chekout, setCheckout] = useContext(ShowCheckoutContext)
    const paypal = useRef();
    const paypal2 = useRef()
    const [cardData, setCardData] = useState([])
    const userID = authorisatUser.data.user_ID
    const [cardId, setCardId] = useState()

    useEffect(() => {
        if (authorisatUser.data.Birtday != 'default' && cardData.length == 0) {
            axios({
                method: "get",
                url: "http://localhost:10000/users/card/" + userID,
                responseType: "json",
            }).then(function (responseponse) {
                if (responseponse.status != 200) {
                    return;
                }
                setCardData(responseponse.data);
                if (!cardId) {
                    setCardId({
                        'cardNr': responseponse.data[0].card_number,
                        'month': responseponse.data[0].expiration_date_month,
                        'year': responseponse.data[0].expiration_date_year,
                        'BankLogo': responseponse.data[0].Bank_Logo,
                        'Bank_Name': responseponse.data[0].Bank_Name,
                        'cardholde': responseponse.data[0].cardholde,
                    })
                }
                console.warn('Get Card Data:', responseponse.data[0])
            }).catch((reason) => {
                if (!cardData) {
                    console.error("get cardData failed", reason);
                }
            })
        }
    }, [authorisatUser])


    const updateTheDb = () => {
        const updateCredit = {
            'userId': authorisatUser.data.user_ID,
            'add': creditAdd
        }
        axios.post(
            'http://localhost:10000/users/credit',
            updateCredit,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((responseponse) => {
                console.log(responseponse.data)
            }
            ).catch((reason) => {
                if (!updateCredit) {
                    console.error("post failed", reason);
                }
            });
    }
    const payPalRender = () => {
        console.warn('creditAdd', creditAdd)
        if (window.paypalBtn) window.paypalBtn.close();
        window.paypalBtn = window.paypal.Buttons({
            createOrder: function (data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: creditAdd,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.warn(order)
                if (order.status == 'COMPLETED') {
                    updateTheDb();
                    setShowShowPayPal('none');
                    setCheckout('block');
                    setShowAddCredit('none');
                    setCreditAdd(0)
                }
            },
            onError: function (err) {
                console.error(err);
            },
            style: {
                color: "black",
                label: "checkout",
                layout: "vertical",
                shape: "pill",
            },
        });
        window.paypalBtn.render(paypal.current);
    }
    const [product] = useState({
        name: "Add Credits!",
        price: creditAdd,
        //   description: "Cool car"
    });
    const loadCardData = () => {
        if (window.paypalBtn) window.paypalBtn.close();
        window.paypalBtn = window.paypal.Buttons({
            createOrder: function (data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: creditAdd,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.warn(order)
                if (order.status == 'COMPLETED') {
                    updateTheDb();
                    setShowShowPayPal('none');
                    setCheckout('block');
                    setShowAddCredit('none');
                    setCreditAdd(0)
                }
            },
            onError: function (err) {
                console.error(err);
            },
            style: {
                color: "black",
                label: "checkout",
                layout: "vertical",
                shape: "pill",
            },
        });
        window.paypalBtn.render(paypal2.current);
    }
    async function handleToken(token, addresses) {
        const response = await axios.post(
            "https://ry7v05l6on.sse.codesandbox.io/checkout",
            { token, product }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
            console.log("Success! Check email for details", { type: "success" });
            updateTheDb()
        } else {
            console.log("Something went wrong", { type: "error" });
        }
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
                <p>You can choose between PayPal and your Cards!</p>
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


