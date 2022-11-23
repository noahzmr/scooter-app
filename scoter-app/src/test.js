import './App.css';
import React, { useEffect, useState, useContext, render } from 'react';

export default function Test() {
    let p = new Promise((resolve, reject) => {
        let a = 1 + 1
        if (a == 2) {
            resolve('Success')
        } else {
            reject('Failed')
        }
    })
    p.then((message) => {
        console.log(message)
    }).catch((message) => {
        console.log(message)
    })


}