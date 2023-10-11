{/* Import Style Sheets */}
import './App.css'

{/* Importing the items in Pages directory */}
import { BasicTemplatePage } from './pages';

function App() {
  return (
    <div>
      <p className='underline text-4xl'>Hello World</p>
      <BasicTemplatePage />
    </div>
  )
}

export default App