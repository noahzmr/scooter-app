import React, { useState } from 'react'
import PropTypes from 'prop-types'

const initalState = {
  Birthday: 'default',
  Email: '',
  Gender: '',
  MobileNr: '',
  User_Blob: '',
  name: '',
  nName: '',
  user_ID: ''
}
const showAddValue = 'none'
const showAddValue2 = 'none'
const scoterValue = 0
const creditAddCost = 0
const showPayPalValue = 'none'
const checkoutValue = 'block'

export const UserContext = React.createContext()
export const ScoterContext = React.createContext()
export const ShowAddContext = React.createContext()
export const ShowAddCreditContext = React.createContext()
export const CreditAddCostContext = React.createContext()
export const ShowPayPalContext = React.createContext()
export const ShowCheckoutContext = React.createContext()

const Store = ({ children }) => {
  const [authorisatUser, setAuthorisatUser] = useState(initalState)
  return (
    <UserContext.Provider value={[authorisatUser, setAuthorisatUser]}>
      {children}
    </UserContext.Provider>
  )
}

export const Scoter = ({ children }) => {
  const [scooterId, setScoterId] = useState(scoterValue)
  return (
    <ScoterContext.Provider value={[scooterId, setScoterId]}>
      {children}
    </ScoterContext.Provider>
  )
}

export const ShowAdd = ({ children }) => {
  const [showAdd, setShowAdd] = useState(showAddValue2)
  return (
    <ShowAddContext.Provider value={[showAdd, setShowAdd]}>
      {children}
    </ShowAddContext.Provider>
  )
}

export const ShowAddCredit = ({ children }) => {
  const [showAddCredit, setShowAddCredit] = useState(showAddValue)
  return (
    <ShowAddCreditContext.Provider value={[showAddCredit, setShowAddCredit]}>
      {children}
    </ShowAddCreditContext.Provider>
  )
}

export const CreditAdd = ({ children }) => {
  const [creditAdd, setCreditAdd] = useState(creditAddCost)
  return (
    <CreditAddCostContext.Provider value={[creditAdd, setCreditAdd]}>
      {children}
    </CreditAddCostContext.Provider>
  )
}

export const ShowPayPal = ({ children }) => {
  const [showPayPal, setShowShowPayPal] = useState(showPayPalValue)
  return (
    <ShowPayPalContext.Provider value={[showPayPal, setShowShowPayPal]}>
      {children}
    </ShowPayPalContext.Provider>
  )
}

export const Checkout = ({ children }) => {
  const [chekout, setCheckout] = useState(checkoutValue)
  return (
    <ShowCheckoutContext.Provider value={[chekout, setCheckout]}>
      {children}
    </ShowCheckoutContext.Provider>
  )
}
export default Store

Checkout.propTypes = {
  children: PropTypes.any.isRequired
}

ShowPayPal.propTypes = {
  children: PropTypes.any.isRequired
}

CreditAdd.propTypes = {
  children: PropTypes.any.isRequired
}

ShowAddCredit.propTypes = {
  children: PropTypes.any.isRequired
}

ShowAdd.propTypes = {
  children: PropTypes.any.isRequired
}

Scoter.propTypes = {
  children: PropTypes.any.isRequired
}

Store.propTypes = {
  children: PropTypes.any.isRequired
}
