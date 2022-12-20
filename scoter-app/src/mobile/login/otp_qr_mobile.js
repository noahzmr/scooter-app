import '../../style/App.css'
import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import PropTypes from 'prop-types'

export default function OtpQRMobile (props) {
  const [qrCode, setQrCode] = useState([])

  useEffect(() => {
    if (qrCode !== props.qrCode) {
      setQrCode(props.qrCode)
      console.log('PROPS', props.qrCode, qrCode)
    }
  }, [props])

  if (!props.qrCode) {
    return (<div>There are no OTP User!</div>)
  }
  if (props.qrCode.qrCode) {
    // <img src={Buffer.from(item.qrCode, '').toString('')} alt='QR Code' />
    return (
      <div>
        <div
          key={props.qrCode.id}
        >
          <img
            src={Buffer.from(props?.qrCode?.qrCode, '').toString('')}
            alt='QR Code'
          />
        </div>
      </div>
    )
  }
}

OtpQRMobile.propTypes = {
  qrCode: PropTypes.any.isRequired
}
