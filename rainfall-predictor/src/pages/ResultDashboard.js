import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css";

const ResultDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    city,
    predicted_rainfall_mm,
    weather_data,
    model_scores
  } = location.state || {};

  const rfPrediction = predicted_rainfall_mm?.RandomForest;
  const xgbPrediction = predicted_rainfall_mm?.XGBoost;

  const rf_rmse = model_scores?.RandomForest?.rmse;
  const rf_r2 = model_scores?.RandomForest?.r2;
  const xgb_rmse = model_scores?.XGBoost?.rmse;
  const xgb_r2 = model_scores?.XGBoost?.r2;

  return (
      <div
      className="result-dashboard-container"
      style={{ backgroundImage: "url('/darkscene.png')" }}
      >

      <h1 className="page-heading">🌧️ Rainfall Prediction Dashboard</h1>

      <div className="scrollable-content">
        <div className="dashboard-card">
          <h2>📍 City: {city}</h2>
          <p className="prediction-text">🌲 Random Forest: <strong>{rfPrediction} mm</strong></p>
          <p className="prediction-text">⚡ XGBoost: <strong>{xgbPrediction} mm</strong></p>
        </div>

        <div className="dashboard-card">
          <h3>📊 Model Performance</h3>
          <p className="metric-text">Random Forest RMSE: <span>{rf_rmse ?? "--"}</span></p>
          <p className="metric-text">Random Forest R²: <span>{rf_r2 ?? "--"}</span></p>
          <p className="metric-text">XGBoost RMSE: <span>{xgb_rmse ?? "--"}</span></p>
          <p className="metric-text">XGBoost R²: <span>{xgb_r2 ?? "--"}</span></p>
        </div>

        {weather_data && (
          <div className="dashboard-card">
            <h3>🌤️ Weather Snapshot</h3>
            <ul className="weather-list">
              <li>🌡️ Temperature: {weather_data.temperature}°C</li>
              <li>💧 Humidity: {weather_data.humidity}%</li>
              <li>🌀 Pressure: {weather_data.pressure} hPa</li>
              {/* <li>🌧️ Rainfall: {weather_data.rainfall} mm</li> */}
              <li>🌬️ Wind Speed: {weather_data.wind_speed} m/s</li>
              <li>☁️ Cloud Cover: {weather_data.cloud_cover}%</li>
            </ul>
          </div>
        )}
      </div>

      <button className="back-button" onClick={() => navigate("/predictor")}>
        🔙 Back to Predictor
      </button>
    </div>
  );
};

export default ResultDashboard;
