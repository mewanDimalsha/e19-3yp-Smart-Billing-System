import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signin_Page/Signup';
import Login from './Login_Page/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
