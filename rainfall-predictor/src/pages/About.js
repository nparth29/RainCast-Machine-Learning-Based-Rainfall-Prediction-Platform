
import React from 'react';
import ThreeScene from '../components/ThreeScene';
import '../styles/About.css';
import rainsVideo from '../assets/rains_vid.mp4'; // Ensure correct path to your video

export default function About() {
  return (
    <div className="about-container">
      {/* 🎥 Background Video */}
      <video
  className="background-video"
  src={require('../assets/rains_vid.mp4')}
  autoPlay
  muted
  loop
  playsInline
/>


      {/* 🌐 Navigation Bar */}
      <div className="nav-bar">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/predictor" className="nav-link">Predictor</a>
      </div>

      {/* 📝 Main Content */}
      <div className="about-content">
        <h1 className="about-title">🌧️ About This Project</h1>
        <p className="about-text">
          Welcome to our <strong>Rainfall Prediction System</strong> — an intelligent solution designed to forecast rainfall using cutting-edge machine learning techniques. 
          This project is the result of a collaborative effort by our team, aiming to contribute to the agricultural and environmental sectors by providing accurate and timely rainfall predictions.
        </p>

        <h2 className="section-heading">🛠️ Tools & Technologies</h2>
        <ul className="about-list">
          <li><strong>Machine Learning Model:</strong> XGBoost (Extreme Gradient Boosting)</li>
          <li><strong>Programming Language:</strong> Python</li>
          <li><strong>Libraries:</strong> Pandas, NumPy, Scikit-learn, XGBoost, Matplotlib</li>
          <li><strong>Web Development:</strong> Flask</li>
        </ul>

        <h2 className="section-heading">🌱 Impact & Future Scope</h2>
        <p className="about-text">
          Accurate rainfall prediction plays a crucial role in agricultural planning, disaster management, and water conservation. In the future, we aim to:
        </p>
        <ul className="about-list">
          <li>Integrate real-time weather data APIs</li>
          <li>Expand the system to predict other weather events</li>
          <li>Improve prediction accuracy using deep learning techniques</li>
          <li>Build a mobile application for broader accessibility</li>
        </ul>

        <div className="team-image-container">
        <img src={require('../assets/group3.jpeg')} alt="Team" className="team-image" />
        </div>
        <h2 className="about-subtitle">👨‍💻 Meet the Team</h2>
        <div className="team-cards">
        
        <div className="team-card">PARTH MISHRA</div>
        <div className="team-card">OM MUJUMDAR</div>
        <div className="team-card">PRATHAMESH RANE</div>
        </div>


        <div className="social-links">
          <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>
      </div>

      <ThreeScene />
    </div>
  );
}
