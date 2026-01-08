

// Home.js
import React from 'react';
import '../styles/Home.css';
import ThreeScene from '../components/ThreeScene';

export default function Home() {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/darkscene.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="nav-bar">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/predictor" className="nav-link">Predictor</a>
      </div>

      <div className="hero">
        <h1 className="hero-title">Rainfall Predictor</h1>
        <p className="hero-subtitle">
          AI-powered dashboard to predict rainfall using real-time weather data.
        </p>
      </div>

      <ThreeScene />
    </div>
  );
}





