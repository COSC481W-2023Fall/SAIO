import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
