import '../../App.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Buffer } from 'buffer'

export default function OtpQR(props) {
    const [qrCode, setQrCode] = useState([])

    if (qrCode != props.qrCode) {
        setQrCode(undefined);
        setQrCode(props.qrCode)
        console.log("PROPS", props.qrCode, qrCode)
    }


    if (!props.qrCode) {
        return (<div>There are no OTP User!</div>)
    }
    if (props.qrCode.qrCode) {
        //<img src={Buffer.from(item.qrCode, '').toString('')} alt='QR Code' />
        return (
            <div>
                <div
                    key={props.qrCode.id}
                >
                    <img
                        src={Buffer.from(props.qrCode.qrCode, '').toString('')}
                        alt='QR Code'
                    />
                </div>
            </div>
        )
    }
}
