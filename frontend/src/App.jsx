import { Routes, Route } from 'react-router-dom'

/* Web Pages */
import Calendar from './components/pages/Calendar'
import Flashcards from './components/pages/Flashcards'
import Home from './components/pages/Home'
import Notes from './components/pages/Notes'
import Todo from './components/pages/Todo'
{/* Import Style Sheets */}
import './App.css'

{/* Importing the items in Components directory */}
import { BasicTemplateComponent } from './components';

{/* Importing the items in Pages directory */}
import { BasicTemplatePage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/app/home" element={<Home/>}></Route>
      <Route path="/app/todo" element={<Todo/>}></Route>
      <Route path="/app/calendar" element={<Calendar/>}></Route>
      <Route path="/app/flashcards" element={<Flashcards/>}></Route>
      <Route path="/app/notes" element={<Notes/>}></Route>
    </Routes>
  )
}

export default App