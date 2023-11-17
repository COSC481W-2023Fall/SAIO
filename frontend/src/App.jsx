import React, {useState} from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'

/* Web Pages */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditAccount from"./pages/EditAccount";
import CalendarApp from "./pages/app/CalendarApp";
import Home from "./pages/app/Home";
import Notes from "./pages/app/Notes";
import Todo from "./pages/app/Todo";
import DisplayFlashcards from "./pages/app/DisplayFlashcards";
import FlashcardManagement from "./pages/app/FlashcardManagment";
import AppLayout from "./pages/AppLayout";

function App() {
  return (    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="signup" element={<Signup/>}></Route>
          <Route path="edit" element={<EditAccount/>}></Route>
          <Route path="app" element={<AppLayout/>}>
            <Route path="flashcards" element={<DisplayFlashcards/>}></Route>
            <Route path="flashcards/manage" element={<FlashcardManagement/>}></Route>
            <Route path="calendar" element={<CalendarApp/>}></Route>
            <Route path="home" element={<Home/>}></Route>
            <Route path="notes" element={<Notes/>}></Route>
            <Route path="notes/:noteId" element={<Notes/>}></Route>
            <Route path="todo" element={<Todo/>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
