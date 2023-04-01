import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Cert from './pages/cert/Cert';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cert" element={<Cert />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
