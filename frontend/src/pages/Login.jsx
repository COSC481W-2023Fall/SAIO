import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';
import apiUrl from '../config';
import '../style/Login.css';

export default function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
  });
  const [user_exists, setUserExists] = useState(null);
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const navigateToSignup = () =>{
    navigate('/signup');
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async(e) => {
      e.preventDefault();
    

      try {
        const response1 = await axios.post(`${config.apiUrl}/login/token`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        const data1 = response1.data;
        console.log(data1);
        
        if(data1.access_token == formData.email){
          setUserExists(true);
        
        }
        

        //const response2 = await axios.get(`${config.apiUrl}/signup/check-password/${pass}`);
        //const data2 = response2.data;
  
       // setPasswordExists(data2.password_exists);

        
      } catch (error) {
        console.error(error);
        // Handle the error here, e.g. display an error message to the user
      }
      if(user_exists){
        setauthenticated(true)
          localStorage.setItem("authenticated", true);
          navigate("/");
      }
     
  }

  return (
      <div className="auth-form-container">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">email</label>
              <input className="input" value={formData.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
              <label htmlFor="password">password</label>
              <input className="input" value={formData.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" />
              <button className="log-btn" type="submit">Log In</button>
          </form>
         
          <button className="link-btn" onClick={navigateToSignup}>Don't have an account? Register here.</button>
      </div>
  )
}