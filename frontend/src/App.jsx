
import React, {useState} from "react";
import './App.css';
import {Login} from "./components/pages/Login";
import { Routes, Route } from 'react-router-dom'

/* Web Pages */
import Calendar from './components/pages/Calendar'
import Flashcards from './components/pages/Flashcards'
import Home from './components/pages/Home'
import Notes from './components/pages/Notes'
import Todo from './components/pages/Todo'

{/* Importing the items in Components directory */}
import { BasicTemplateComponent } from './components';

{/* Importing the items in Pages directory */}
import { BasicTemplatePage } from './pages';


function App() {
  

  return (

   
    
    <Routes>
      <Route path= "/login" element={<Login/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/app/home" element={<Home/>}></Route>
      <Route path="/app/todo" element={<Todo/>}></Route>
      <Route path="/app/calendar" element={<Calendar/>}></Route>
      <Route path="/app/flashcards" element={<Flashcards/>}></Route>
      <Route path="/app/notes" element={<Notes/>}></Route>
    </Routes>
    
  )
}

export default App
