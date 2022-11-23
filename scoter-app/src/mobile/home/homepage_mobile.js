import '../../App.css';
import React, { useEffect, useState, useRef, useContext, createContext, useReducer } from 'react';
import IdleTimer from '../../component/idleTimer';
import { ShowAddContext, ShowAddCreditContext, UserContext, ScoterContext } from '../../component/context';
import FullMapMobile from '../map/map';
import Wallet from '../payment/wallet_mobile';
import Billing from '../payment/billing_mobile';
import Scooter from '../scooter/scooter';
import AddCredit from '../payment/add_credit_mobile';
export default function HomepageMobile(props) {

    const [addCard, setAddCard] = useState('none')
    const [userId, setUserId] = useState('')
    const [showHompage, setShowHompage] = useState('block')
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [showAdd, setShowAdd] = useContext(ShowAddContext)
    const [isTimeout, setIsTimeout] = useState(false)
    const [showAddCredit, setShowAddCredit] = useContext(ShowAddCreditContext)
    const [showMap, setShowMap] = useState('block')
    const [showProfile, setShowProfile] = useState('none')
    const [showWallet, setShowWallet] = useState('none')
    const [showBilling, setShowBilling] = useState('none')
    const [scooterId, setScoterId] = useContext(ScoterContext)

    const map = () => {
        setShowMap('block')
        setShowProfile('none')
        setShowWallet('none')
        setShowBilling('none')
    }
    const profile = () => {
        setShowMap('none')
        setShowProfile('block')
        setShowWallet('none')
        setShowBilling('none')
    }
    const wallet = () => {
        setShowMap('none')
        setShowProfile('none')
        setShowWallet('block')
        setShowBilling('none')
    }
    const billing = () => {
        setShowMap('none')
        setShowProfile('none')
        setShowWallet('none')
        setShowBilling('block')
    }

    useEffect(() => {
        console.log('authorisatUser', authorisatUser.data)
        const timer = new IdleTimer({
            timeout: 100, //expire after 100 seconds
            onTimeout: () => {
                setIsTimeout(true);
            },
            onExpired: () => {
                //do something if expired on load
                setIsTimeout(true);
            }
        });

        return () => {
            timer.cleanUp();
        };
    }, []);


    if (authorisatUser.Birthday == 'default') {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        console.log('props.userLogon.data.user_ID', props.userLogon.data.user_ID, 'userID', userId)
        if (userId.length == 0) {
            setUserId(props.userLogon.data.user_ID)
        }
        if (scooterId == 0) {
            return (
                <div
                    className="bodyM"
                    style={{ display: showHompage }}
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
                    style={{ display: showHompage }}
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

