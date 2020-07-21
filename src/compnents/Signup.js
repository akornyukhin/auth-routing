import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default function Signup() {
    
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    
    useEffect(() => {
        password === passwordCheck ? setPasswordMatch(false) : setPasswordMatch(true)
      }, [password, passwordCheck])

    function postSignUp(event) {
        event.preventDefault();
        if (password !== passwordCheck) {
            console.log('Passwords does not match')
        } else {
            axios.post("http://127.0.0.1:5000/create_user",
            {
                "username": userName,
                "password": password
            }).then(result => {
                if (result.status === 200){
                    console.log(result.data)
                }
            }).catch(e => console.log(e))
        }
    }


    return (
        <div>
           <form onSubmit={postSignUp}>
                <input
                    type='text'
                    placeholder='username'
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value)
                    }} />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }} />
                <input
                    type='password'
                    placeholder='password again'
                    value={passwordCheck}
                    onChange={e => {
                        setPasswordCheck(e.target.value);
                    }} />
                <button>Sign Up</button>
            </form>
            <Link to="/login">Already have an account?</Link>
            { passwordMatch &&<div style={{background: 'red'}}>Passwords doesn't match!</div> }
        </div>
    )
}