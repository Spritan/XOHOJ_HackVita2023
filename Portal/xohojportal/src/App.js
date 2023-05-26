import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Cert from './pages/cert/Cert';
import Certs from './pages/certs/Certs';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cert" element={<Cert />} />
          <Route path="/certs/:id" element={<Certs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
