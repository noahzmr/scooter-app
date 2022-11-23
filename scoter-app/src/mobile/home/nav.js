import '../../App.css';
import React, { useEffect, useState, useRef, useContext, createContext, useReducer } from 'react';

export default function Nav() {
    return (
        <div className='nav'>
            <button><i className="bi bi-map"></i></button>
            <button><i className="bi bi-person-circle"></i></button>
            <button><i className="bi bi-wallet2"></i></button>
            <button><i className="bi bi-receipt-cutoff"></i></button>
        </div>
    )
}