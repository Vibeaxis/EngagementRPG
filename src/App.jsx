
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import GamePage from './pages/GamePage';
import LandingPage from './pages/LandingPage';

function App() {
  const playerHandle = localStorage.getItem('playerHandle');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={playerHandle ? <Navigate to="/game" replace /> : <LandingPage />} 
        />
        <Route 
          path="/game" 
          element={playerHandle ? <GamePage /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
