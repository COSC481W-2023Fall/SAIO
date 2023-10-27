
import React, {useState} from "react";
import './App.css';
import {Login} from "./components/pages/Login";
import { Routes, Route, BrowserRouter } from 'react-router-dom'

/* Web Pages */
import Calendar from './components/pages/Calendar'
import Flashcards from './components/pages/Flashcards'
import Home from './components/pages/Home'
import Notes from './components/pages/Notes'
import Todo from './components/pages/Todo'
import RegisterForm from './components/pages/RegisterForm'

function App() {
  return (    
    <BrowserRouter>
      <Routes>
          <Route path= "/login" element={<Login/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/app/home" element={<Home/>}></Route>
          <Route path="/app/todo" element={<Todo/>}></Route>
          <Route path="/app/calendar" element={<Calendar/>}></Route>
          <Route path="/app/flashcards" element={<Flashcards/>}></Route>
          <Route path="/app/notes" element={<Notes/>}></Route>
          <Route path="/app/RegisterForm" element={<RegisterForm/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
