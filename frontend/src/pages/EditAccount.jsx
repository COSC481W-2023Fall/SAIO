import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../config';
import apiUrl from '../config';
// import '../style/Login.css';

export default function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
    newEmail:'',
    newPass:''
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

        const response2  = await axios.put(`${config.apiUrl}/edit/`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        

        //const response2 = await axios.get(`${config.apiUrl}/signup/check-password/${pass}`);
        //const data2 = response2.data;
  
       // setPasswordExists(data2.password_exists);

        
      } catch (error) {
        console.error(error);
        // Handle the error here, e.g. display an error message to the user
      }
     
     
  }

  return (
      <div className="auth-form-container">
          <h1>Edit Account</h1>
          <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">email</label>
              <input className="input" value={formData.email} onChange={(e) => handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
              <label htmlFor="newEmail">New Email</label>
              <input className="input" value={formData.newEmail} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="newEmail" name="newEmail" />
              <label htmlFor="password">password</label>
              <input className="input" value={formData.newPass} onChange={handleChange} type="password" placeholder="********" id="password" name="newPass" />
              <button className="log-btn" type="submit">Submit</button>
          </form>
         
         
      </div>
      
  )
}