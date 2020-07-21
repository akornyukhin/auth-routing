import React from 'react'
import { useAuth } from "../context/auth"

export default function Admin(props) {
    const { setAuthTokens } = useAuth();

    function logOut() {
        // localStorage.removeItem("tokens");
        setAuthTokens(null);
    }

    return (
        <>
            <div>
                Admin
            </div>
            <button onClick={logOut}>Log out</button>
        </>
    )
}
