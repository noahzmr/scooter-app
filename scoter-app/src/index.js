import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Store, { Scoter, ShowAdd, ShowAddCredit, CreditAdd, ShowPayPal, Checkout } from './services/context'
import {
  BrowserRouter as Router
} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Store>
        <Scoter>
          <ShowAdd>
            <ShowAddCredit>
              <CreditAdd>
                <ShowPayPal>
                  <Checkout>
                    <App />
                  </Checkout>
                </ShowPayPal>
              </CreditAdd>
            </ShowAddCredit>
          </ShowAdd>
        </Scoter>
      </Store>
    </Router>
  </React.StrictMode >
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: http://bit.ly/CRA-vitals
reportWebVitals()
