import '../../App.css';
import { useState, useEffect, useContext } from 'react';
import scooter from '../../img/scooter.png'
import LoginPage from './login';
import CreateNewUser from '../createNewUser';
import { UserContext, ShowAddContext, ShowAddCreditContext } from '../../component/context';
import { isMobile } from 'react-device-detect';

function Start() {

    const [showStart, setShowStart] = useState('block')
    const [showLogin, setShowLogin] = useState('none')
    const [showNewUser, setShowNewUser] = useState('none')
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [showAdd, setShowAdd] = useContext(ShowAddContext)
    const [showAddCredit, setShowAddCredit] = useContext(ShowAddCreditContext)

    const CheckIfLogin = () => {
        console.log('authorisatUser', authorisatUser.data, authorisatUser)
        const localStorageUserCheck = localStorage.getItem('user')
        const localStorageUserCheckJson = JSON.parse(localStorageUserCheck)
        console.log("Still Login?", localStorageUserCheckJson)
        if (authorisatUser.Birthday == 'default') {
            setShowStart('block')
        } else {
            setShowStart('none')
        }
    }

    if (!isMobile) {
        return (
            <div
                className="body"
                style={{ display: showStart }}
            >
                <div
                    id="loginPage"
                >
                    <div
                        className='container'
                    >
                        <form id="Form1">
                            <div>
                                <h1>Lets take a Ride!</h1>
                                <div
                                    className='startAnimantionContainer'
                                >
                                    <div className="clouds"></div>
                                    <div className="shadow"></div>
                                    <div className='speedArrayContainer'>
                                        <div className='speedArray'></div>
                                        <div className='speedArray1'></div>
                                        <div className='speedArray'></div>
                                    </div>
                                    <img src={scooter} />
                                </div>
                                <div
                                    className='btnContainer'
                                >
                                    <button
                                        className='btnActionSecondary'
                                        onClick={() => setShowNewUser('block')}
                                        type='button'
                                    >
                                        I'm new
                                    </button>
                                    <button
                                        className='btnActionPrimary'
                                        onClick={() => { setShowLogin('block'); setShowAdd('none'); setShowAddCredit('none') }}
                                        type='button'
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    style={{ display: showLogin }}
                >
                    <LoginPage />
                </div>
                <div
                    style={{ display: showNewUser }}
                >
                    <CreateNewUser />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                Mobile user
            </div>
        )
    }

}

export default Start;
