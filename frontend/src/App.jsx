import React, {useState} from "react";
import './App.css';
import {Login} from "./Login";

function App() {
  const [currentForm, setCurrentForm] = useState('Login');

  return (
    <div className="App">
      {currentForm === "Login"? <Login /> : <Register />}
    
    </div>
  )
}

export default App