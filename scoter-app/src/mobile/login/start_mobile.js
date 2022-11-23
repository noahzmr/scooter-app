import '../../App.css';
import { useState, useEffect, useContext } from 'react';
import scooter from '../../img/scooter.png'
import LoginPageMobile from './login_mobile';
// import CreateNewUser from './createNewUser';
import { UserContext, ShowAddContext, ShowAddCreditContext } from '../../component/context';
import CreateNewUserMobile from './new_customer';
function StartMobile() {

    const [showStart, setShowStart] = useState('block')
    const [showLogin, setShowLogin] = useState('none')
    const [showNewUser, setShowNewUser] = useState('none')
    const [authorisatUser, setAuthorisatUser] = useContext(UserContext);
    const [showAdd, setShowAdd] = useContext(ShowAddContext)
    const [showAddCredit, setShowAddCredit] = useContext(ShowAddCreditContext)

    return (
        <div
            className="body"
            style={{ display: showStart }}
        >
            <div
                id="LoginPageMobile"
            >
                <div
                    className='containerM'
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
                                className='btnContainerHorizontal'
                            >

                                <button
                                    className='btnActionPrimary'
                                    onClick={() => { setShowLogin('block'); setShowAdd('none'); setShowAddCredit('none') }}
                                    type='button'
                                >
                                    Login
                                </button>
                                <br />
                                <button
                                    className='btnActionSecondary'
                                    onClick={() => setShowNewUser('block')}
                                    type='button'
                                >
                                    I'm new
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div
                style={{ display: showLogin }}
            >
                <LoginPageMobile />
            </div>
            <div
                style={{ display: showNewUser }}
            >
                <CreateNewUserMobile />
            </div>
        </div>
    );
}

export default StartMobile;
