import React, { useState } from "react";
import axios from "axios";
import AuthPage from "./AuthPage";

function Auth({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password, setToken) => {
    try {
      const response = await axios.post(`/auth/login`, {email, password}); 
      localStorage.setItem("userData", response.data.token);  
      setToken(response.data.token);
    } catch (e) {
      window.M.toast({html: e.response.data.message});
    }
  }

  const registration = async (email, password) => {
    try {
      const response = await axios.post(`/auth/registration`, {email, password});
      window.M.toast({html: response.data.message});
      login(email, password, setToken);
    } catch (e) {
      window.M.toast({html: e.response.data.message});
    }
  }

  return (
    <AuthPage 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      setToken={setToken}
      login={login}
      registration={registration}
    />
  )
}

export default Auth;