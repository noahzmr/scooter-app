import { StrictMode, useEffect, useState } from "react";
import './App.css';
import Start from './web/login/start';
import Store from './component/context';
import { Scoter, ShowAdd, ShowAddCredit, CreditAdd, ShowPayPal, Checkout } from './component/context';
import { isMobile } from 'react-device-detect';
import StartMobile from './mobile/login/start_mobile'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Nav from "./mobile/home/nav";
import HomepageMobile from './mobile/home/homepage_mobile'

export default function App() {
  if (isMobile) {
    return (
      <StrictMode>
        <Router>
          <Store>
            <Scoter>
              <ShowAdd>
                <ShowAddCredit>
                  <CreditAdd>
                    <ShowPayPal>
                      <Checkout>
                        <div>
                          <StartMobile  />
                        </div>
                      </Checkout>
                    </ShowPayPal>
                  </CreditAdd>
                </ShowAddCredit>
              </ShowAdd>
            </Scoter>
          </Store>
        </Router>
      </StrictMode>
    )
  } else {
    return (
      <StrictMode>
        <Router>
          <Store>
            <Scoter>
              <ShowAdd>
                <ShowAddCredit>
                  <CreditAdd>
                    <ShowPayPal>
                      <Checkout>
                        <div className="App">
                          <Start />
                        </div >
                      </Checkout>
                    </ShowPayPal>
                  </CreditAdd>
                </ShowAddCredit>
              </ShowAdd>
            </Scoter>
          </Store>
        </Router>
      </StrictMode>
    );
  }
}
