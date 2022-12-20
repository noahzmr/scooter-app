import React, { useEffect, useContext } from 'react'
import './style/App.css'
import Start from './web/login/start'
import { isMobile } from 'react-device-detect'
import StartMobile from './mobile/login/start_mobile'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import { UserContext } from './services/context'

// Import Web-Client Sides for the Router
import Admin from './web/admin/admin'
import Homepage from './web/homepage'
import User from './web/user'

export default function App () {
  const navigate = useNavigate()
  /* eslint-disable no-unused-vars */
  const [authorisatUser, setAuthorisatUser] = useContext(UserContext)
  /* eslint-enable no-unused-vars */

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const userInformarion = localStorage.getItem('user')
      console.warn(JSON.parse(userInformarion).user_ID)
      navigate('/')
      setAuthorisatUser(JSON.parse(userInformarion))
    } else {
      navigate('/login')
    }
  }, [])

  if (isMobile) {
    return (
      <div>
        <StartMobile />
      </div>
    )
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path='/login' element={<Start />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<User />} />
          <Route path='/' element={<Homepage />} />
        </Routes>
      </div >
    )
  }
}
