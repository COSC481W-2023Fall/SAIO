import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from '../config'

export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [email_exists, setEmailExists] = useState(null);
  const [password_exists, setPasswordExists] = useState(null);
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response1 = await axios.get(`${config.apiUrl}/signup/check-email/${email}`);
        const data1 = response1.data;
  
        setEmailExists(data1.email_exists);

        const response2 = await axios.get(`${config.apiUrl}/signup/check-password/${pass}`);
        const data2 = response2.data;
  
        setPasswordExists(data2.password_exists);

        
      } catch (error) {
        console.error(error);
        // Handle the error here, e.g. display an error message to the user
      }
      if(email_exists & password_exists){
        setauthenticated(true)
          localStorage.setItem("authenticated", true);
          navigate("/");
      }
      else{
        console.log("No")
      }
  }

  return (
      <div className="auth-form-container">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">email</label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
              <label htmlFor="password">password</label>
              <input className="input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
              <button className="log-btn" type="submit">Log In</button>
          </form>
          <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
      </div>
  )
}