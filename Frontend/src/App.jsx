import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ShortenUrl from './pages/ShortenUrl';  // Correct import
import MyUrls from './pages/MyUrls';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem', maxWidth: '100vw', minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api/shorten" element={<ShortenUrl />} /> 
          <Route path="/myUrls" element={<MyUrls />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
