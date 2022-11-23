import '../../App.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext, ShowAddCreditContext } from '../../component/context';
import $ from 'jquery';

export default function Billing(props) {

    const [billingData, setBillingData] = useState([])
    const [userID, setUserId] = useState()
    const [creditData, setCreditData] = useState([])
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [showAddCredit, setShowAddCredit] = useContext(ShowAddCreditContext)

    const loadData = () => {
        console.warn(creditData.duration)
        setUserId(authorisatUser.data.user_ID)
        console.log('authorisatUser.data.user_ID', authorisatUser.data.user_ID, 'userID loadData', userID)
        axios({
            method: "get",
            url: "http://localhost:10000/users/credit/" + userID,
            responseType: "json",
        }).then(function (responseponse) {
            console.log('Get Billing Data:', responseponse.data)
            setBillingData(responseponse.data)
        }).catch((reason) => {
            if (!billingData) {
                console.error("get billingData failed", reason);
            }
        })
        axios({
            method: "get",
            url: "http://localhost:10000/users/billing/" + userID,
            responseType: "json",
        }).then(function (responseponse) {
            console.log('Get Billing Data:', responseponse.data)
            setCreditData(responseponse.data)
        }).catch((reason) => {
            if (!creditData) {
                console.error("get billingData failed", reason);
            }
        })
        console.log('Credit Data', creditData, 'Billing Data', billingData)
    }
    useEffect(() => {
        setUserId(authorisatUser.data.user_ID)
        console.log('authorisatUser.data.user_ID', authorisatUser.data.user_ID, authorisatUser.data)
        console.log('userID', userID)
        if (authorisatUser.data.Email != 'default' && creditData.length == 0 && billingData.length == 0) {
            setUserId(authorisatUser.data.user_ID)
            axios({
                method: "get",
                url: "http://localhost:10000/users/credit/" + userID,
                responseType: "json",
            }).then(function (responseponse) {
                console.log('Get Billing Data:', responseponse.data)
                setBillingData(responseponse.data)
            }).catch((reason) => {
                if (!billingData) {
                    console.error("get billingData failed", reason);
                }
            })
            axios({
                method: "get",
                url: "http://localhost:10000/users/billing/" + userID,
                responseType: "json",
            }).then(function (responseponse) {
                console.log('Get Billing Data:', responseponse.data)
                setCreditData(responseponse.data)
            }).catch((reason) => {
                if (!creditData) {
                    console.error("get billingData failed", reason);
                }
            })
        }
        if (billingData.length == 0) {
            axios({
                method: "get",
                url: "http://localhost:10000/users/credit/" + userID,
                responseType: "json",
            }).then(function (responseponse) {
                console.log('Get Billing Data:', responseponse.data)
                setBillingData(responseponse.data)
            }).catch((reason) => {
                if (!billingData) {
                    console.error("get billingData failed", reason);
                }
            })
        }
        if (creditData.length == 0) {
            axios({
                method: "get",
                url: "http://localhost:10000/users/billing/" + userID,
                responseType: "json",
            }).then(function (responseponse) {
                console.log('Get Billing Data:', responseponse.data)
                setCreditData(responseponse.data)
            }).catch((reason) => {
                if (!creditData) {
                    console.error("get billingData failed", reason);
                }
            })
        }
    }, [billingData]);


    if (billingData.length == 0) {
        return (
            <div>
                <h1>Loading...</h1>
                <button
                    onClick={loadData}
                    className='icon'
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>
        )
    }
    if (billingData.length != 0) {
        return (
            <div>
                <button
                    onClick={loadData}
                    className='icon'
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
                <button
                    onClick={() => setShowAddCredit('block')}
                    className='icon'
                >
                    <i className="bi bi-plus-lg"></i>
                </button>
                <h3>Credit {billingData.quantity.toFixed(2)}€</h3>
                <div className="table">
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
                                    <div className="table-data">{item.fName} {item.lName}</div>
                                    <div className="table-data">{item.duration} min</div>
                                    <div className="table-data">{item.cost.toFixed(2)} €</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
