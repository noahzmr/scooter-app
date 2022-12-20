import '../../style/App.css'
import React, { useState, useContext } from 'react'
import scooter from '../../img/scooter.png'
import LoginPage from './login'
import CreateNewUser from '../user/createNewUser'
import { ShowAddContext } from '../../services/context'
import { isMobile } from 'react-device-detect'

function Start () {
  const showStart = 'block'
  const [showLogin, setShowLogin] = useState('none')
  const [showNewUser, setShowNewUser] = useState('none')
  /* eslint-disable no-unused-vars */
  const [showAdd, setShowAdd] = useContext(ShowAddContext)
  /* eslint-enable no-unused-vars */

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
                                        id='signup'
                                    >
                                        I&apos;m new
                                    </button>
                                    <button
                                        className='btnActionPrimary'
                                        onClick={() => { setShowLogin('block'); setShowAdd('none') }}
                                        type='button'
                                        id='login'
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
    )
  } else {
    return (
            <div>
                Mobile user
            </div>
    )
  }
}

export default Start
