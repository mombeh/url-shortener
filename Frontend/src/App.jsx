import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ShortenUrl from './pages/ShortenUrl';  // Correct import
import MyUrls from './pages/MyUrls';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shorten-url" element={<ShortenUrl />} /> 
          <Route path="/my-urls" element={<MyUrls />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
