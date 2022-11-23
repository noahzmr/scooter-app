import '../App.css';
import React, { useEffect, useState, useRef, useContext, createContext, useReducer } from 'react';
import Wallet from './payment/wallet';
import CreatCard from './payment/createCard';
import Billing from './payment/billing';
import IdleTimer from '../component/idleTimer';
import { UserContext, ShowAddContext, ShowAddCreditContext } from '../component/context';
import Scoter from './scoter';
import FullMap from './map';
import add from '../img/add.png'
import AddCredit from './payment/addCredit';
import Weather from './admin/weather';
import { ScoterContext } from '../component/context';
export default function Homepage(props) {

    const [addCard, setAddCard] = useState('none')
    const [userId, setUserId] = useState('')
    const [showHompage, setShowHompage] = useState('block')
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [showAdd, setShowAdd] = useContext(ShowAddContext)
    const [isTimeout, setIsTimeout] = useState(false)
    const [showAddCredit, setShowAddCredit] = useContext(ShowAddCreditContext)
    const [scooterId, setScoterId] = useContext(ScoterContext)
    const [showTemp, setShowTemp] = useState('none')
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
    useEffect(() => {
        if (scooterId === 0) {
            setShowTemp('none')
        } else {
            setShowTemp('Block')
        }
    }, [scooterId]);
    const CheckIfLogin = () => {
        const localStorageUserCheck = localStorage.getItem('user')
        const localStorageUserCheckJson = JSON.parse(localStorageUserCheck)
        console.log("Still Login?", localStorageUserCheckJson)
        if (authorisatUser.Birthday != 'default') {
            setShowHompage('block')
        }
    }

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
        return (
            <div
                className="body"
                // onChange={CheckIfLogin}
                style={{ display: showHompage }}
            >
                <div
                    className='map-container'>
                    <FullMap />
                </div>
                <div
                    className='containerMain'
                >
                    <div
                        className='wallet'
                    >
                        <AddCredit />
                    </div>
                    <div
                        className='wallet'
                    >
                        <Scoter />
                    </div>
                    <div
                        className='wallet'
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
                <div
                    style={{ display: showAdd }}
                >
                    <CreatCard />

                </div>
            </div >
        )
    }
}

