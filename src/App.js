import React, { useState } from 'react';
import { BrowserRouter as Router,
         Link,
         Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import Home from "./compnents/Home"
import Admin from "./compnents/Admin"
import Login from "./compnents/Login"
import Singup from "./compnents/Signup"
import { AuthContext } from "./context/auth"
import './App.css';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  console.log(existingTokens);
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
            <li>
              <Link to="/singup">Singup Page</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/singup" component={Singup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
