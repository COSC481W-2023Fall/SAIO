
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

/* Web Pages */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditAccount from"./pages/EditAccount";
import CalendarApp from "./pages/app/CalendarApp";
import ColorThemePalette from "./pages/app/ColorThemePalette";
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
        <Route path="/" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>}>
        </Route>
        <Route path="/login" element={
        
            <Login/>
          }>
        </Route>
        <Route path="/signup" element={
          
            <Signup/>
          }>
        </Route>
        <Route path="/edit" element={
          <PrivateRoute>
            <EditAccount/>
          </PrivateRoute>}>
        </Route>   
        <Route path="app" element={<AppLayout/>}>
        <Route path="flashcards" element={
          <PrivateRoute>
            <DisplayFlashcards/>
          </PrivateRoute>}>
        </Route>
        <Route path="flashcards/manage" element={
          <PrivateRoute>
            <FlashcardManagement/>
          </PrivateRoute>}>
        </Route>
        <Route path="calendar" element={
          <PrivateRoute>
            <CalendarApp/>
            </PrivateRoute>}>
        </Route>
        <Route path="colorthemepalette" element={
        <PrivateRoute>
          <ColorThemePalette />
          </PrivateRoute>}>
        </Route>
        <Route path="home" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>}>
        </Route>
        <Route path="notes" element={
          <PrivateRoute>
            <Notes/>
          </PrivateRoute>}>
        </Route>
        <Route path="notes/:noteId" element={
          <PrivateRoute>
            <Notes/>
          </PrivateRoute>}>
        </Route>
        <Route path="todo" element={
          <PrivateRoute>
            <Todo/>
          </PrivateRoute>}>
        </Route>
        <Route path="Create" element={
          <PrivateRoute>
            <Todo/>
          </PrivateRoute>}>
        </Route>
        <Route path="colorthemepalette" element={
          <PrivateRoute>
            <ColorThemePalette />
          </PrivateRoute>}>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
