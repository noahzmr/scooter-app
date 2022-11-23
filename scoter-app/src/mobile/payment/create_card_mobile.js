import '../../App.css';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext, ShowAddContext } from '../../component/context';
import $ from 'jquery'

export default function CreatCard() {

    const [bankData, setBankData] = useState([])
    const [cardNumber, setCardNumber] = useState()
    const [expirationDateMonth, setExpirationDateMonth] = useState()
    const [expirationDateYear, setExpirationDateYear] = useState()
    const [cardholde, setCardholde] = useState('')
    const [bank, setBank] = useState('')
    const [addCard, setAddCard] = useState('block')
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [userId, setUserID] = useState('')
    const [showAdd, setShowAdd] = useContext(ShowAddContext)

    useEffect(() => {
        if (authorisatUser.data.Birtday == 'default') {
            console.log('nothing')
        } else {
            setUserID(authorisatUser.data.user_ID)
        }
        if (bankData.length == 0) {
            axios({
                method: "get",
                url: "http://localhost:10000/users/bank",
                responseType: "json",
            }).then(function (responseponse) {
                console.log('Get Marker Data:', responseponse.data)
                setBankData(responseponse.data)
            }).catch((reason) => {
                if (!bankData) {
                    console.error("get bankData failed", reason);
                }
            })
        }
    }, [bankData]);

    const inputValues = () => {
        setAddCard('none')
        const paymentValues = {
            'bank': bank,
            'cardNumber': cardNumber,
            'expirationDateMonth': expirationDateMonth,
            'expirationDateYear': expirationDateYear,
            'cardholde': cardholde,
            'user': userId,
        }
        axios.post(
            'http://localhost:10000/users/createPaymentMethode',
            paymentValues,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(
                console.log('New contract was create!', paymentValues),
                setBank('options[0]'),
                setCardholde(''),
                setCardNumber(''),
                setExpirationDateMonth('options[0]'),
                setExpirationDateYear('options[0]'),
                setShowAdd('none')
            ).catch((reason) => {
                if (!paymentValues) {
                    console.error("post failed", reason);
                }
            });
        console.log(paymentValues)

    }
    return (
        <div
            className="abody"
        >
            <div
                className='containerA'
            >
                <button
                    className='backBtn'
                    onClick={() => setShowAdd('none')}
                >
                    <div className="arrow"></div>
                </button>
                <br />
                <form>
                    <div className="card">
                        <figure className="card__figure">
                            <select
                                className="card__figure--logo"
                                onChange={e => setBank(e.target.value)}
                                value={bank}
                            >
                                <option disabled>Choose Bank</option>
                                {bankData.map(item =>
                                    <option value={item.bank_id} key={item.bank_id}>{item.bank_name}</option>
                                )}
                            </select>
                        </figure>
                        <div className="card__reader">
                            <div className="card__reader--risk card__reader--risk-one"></div>
                            <div className="card__reader--risk card__reader--risk-two"></div>
                            <div className="card__reader--risk card__reader--risk-three"></div>
                            <div className="card__reader--risk card__reader--risk-four"></div>
                        </div>
                        <input
                            className="card__number"
                            placeholder='1111 2222 3333 4444'
                            onChange={e => setCardNumber(e.target.value)}
                        />
                        <div className="card__dates">
                            <select
                                className="card__dates--first"
                                onChange={e => setExpirationDateMonth(e.target.value)}
                                placeholder='01'
                                value={expirationDateMonth}
                            >
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                            <span
                                className="card__dates--second"
                            >
                                /
                            </span>
                            <select
                                className="card__dates--second"
                                onChange={e => setExpirationDateYear(e.target.value)}
                                placeholder='22'
                                value={expirationDateYear}
                            >
                                <option>22</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                                <option>32</option>
                            </select>
                        </div>
                        <input
                            className="card__name"
                            placeholder='Cardholde'
                            onChange={e => setCardholde(e.target.value)}
                        />
                        <div className="card__flag">
                            <div className="card__flag--globe"></div>
                            <div className="card__flag--red"></div>
                            <div className="card__flag--yellow"></div>
                        </div>
                    </div>
                </form>
                <br />
                <button
                    className='btnActionPrimary'
                    onClick={inputValues}
                    type='button'
                >
                    Add
                </button>
            </div>
        </div>
    )
}