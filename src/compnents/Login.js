import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/auth"

export default function Login() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    console.log("Login " + isLoggedIn)
    console.log("Error " + isError)

    function postLogin(event) {
        event.preventDefault();
        axios.post("http://127.0.0.1:5000/get_token", {
            "username": userName,
            "password": password
        }).then(result => {
            if (result.status === 200) {
                setAuthTokens(result.data);
                console.log('Logged in');
                setLoggedIn(true);
            } else {
                setIsError(true);
              }
            }).catch(e => {
              setIsError(true);
            });
          }
    
    if (isLoggedIn) {
        return (<Redirect to='/' />);
    }

    return (
        <div>
           <form onSubmit={postLogin}>
                <input
                    type='text'
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder='username' />
                <input
                    type='password'
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                     placeholder='password' />
                <button >Sign In</button>
            </form>
            <Link to="/singup">Create a new account</Link>
            { isError &&<div style={{background: 'red'}}>The username or password provided were incorrect!</div> }
        </div>
    )
}
