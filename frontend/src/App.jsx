import React, {useState} from "react";
// import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'

/* Web Pages */
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Calendar from "./pages/app/Calendar";
import Flashcards from "./pages/app/Flashcards";
import Home from "./pages/app/Home";
import Notes from "./pages/app/Notes";
import Todo from "./pages/app/Todo";

function App() {
  return (    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>

          <Route path="/app/calendar" element={<Calendar/>}></Route>
          <Route path="/app/flashcards" element={<Flashcards/>}></Route>
          <Route path="/app/home" element={<Home/>}></Route>
          <Route path="/app/notes" element={<Notes/>}></Route>
          <Route path="/app/todo" element={<Todo/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
