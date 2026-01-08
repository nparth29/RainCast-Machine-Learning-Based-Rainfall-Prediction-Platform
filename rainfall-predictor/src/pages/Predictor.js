import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ThreeScene from "../components/ThreeScene"; // ✅ Import background
import "../styles/Predictor.css";

const citySuggestions = ["Mumbai", "Thane", "Dadar", "Pune"];

const Predictor = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("api");

  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [cloudCover, setCloudCover] = useState("");

  const navigate = useNavigate();

  const handlePredict = async (e) => {
    e.preventDefault();
    setError(null);

    if (mode === "api" && !city.trim()) {
      setError("⚠️ Please enter a valid city name!");
      return;
    }

    setLoading(true);

    try {
      let payload;

      if (mode === "api") {
        const res = await axios.post("http://127.0.0.1:5000/predict", { city });

        if (res.data.error) {
          setError("⚠️ Error: " + res.data.error);
          setLoading(false);
          return;
        }

        payload = {
          city: res.data.city,
          predicted_rainfall_mm: res.data.predicted_rainfall_mm,
          weather_data: res.data.weather_data,
          model_scores: res.data.model_scores || {},
        };
      } else {
        if (!city.trim() || !temperature || !humidity || !pressure || !windSpeed || !cloudCover) {
          setError("⚠️ Please fill all fields for manual prediction!");
          setLoading(false);
          return;
        }

        const res = await axios.post("http://127.0.0.1:5000/manual-predict", {
          city,
          temperature,
          humidity,
          pressure,
          wind_speed: windSpeed,
          cloud_cover: cloudCover,
        });

        if (res.data.error) {
          setError("⚠️ Error: " + res.data.error);
          setLoading(false);
          return;
        }

        payload = {
          city: res.data.city,
          predicted_rainfall_mm: res.data.predicted_rainfall_mm,
          weather_data: res.data.weather_data,
          model_scores: res.data.model_scores || {},
        };
      }

      navigate("/result", { state: payload });
    } catch (err) {
      console.error("Error:", err);
      setError("⚠️ Failed to get prediction. Check your Flask server.");
    }

    setLoading(false);
  };

  return (
    <div className="predictor-container">
      <ThreeScene />

      <div className="nav-bar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/predictor" className="nav-link active">Predictor</Link>
      </div>

      <h1 className="page-heading">Rainfall Predictor</h1>

      <div className="mode-toggle">
        <button
          className={mode === "api" ? "mode-button active" : "mode-button"}
          onClick={() => setMode("api")}
        >
          🌍 Use API Data
        </button>
        <button
          className={mode === "manual" ? "mode-button active" : "mode-button"}
          onClick={() => setMode("manual")}
        >
          ✍️ Enter Manually
        </button>
      </div>

      <form onSubmit={handlePredict} className="predict-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name (e.g., Mumbai)"
          list="city-list"
        />
        <datalist id="city-list">
          {citySuggestions.map((c, i) => (
            <option key={i} value={c} />
          ))}
        </datalist>

        {mode === "manual" && (
          <>
            <input
              type="number"
              placeholder="🌡️ Temperature (°C)"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
            <input
              type="number"
              placeholder="💧 Humidity (%)"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
            />
            <input
              type="number"
              placeholder="🌀 Pressure (hPa)"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
            />
            <input
              type="number"
              placeholder="🌬️ Wind Speed (m/s)"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value)}
            />
            <input
              type="number"
              placeholder="☁️ Cloud Cover (%)"
              value={cloudCover}
              onChange={(e) => setCloudCover(e.target.value)}
            />
          </>
        )}

        <button type="submit" disabled={loading} className="predict-button">
          {loading ? "🔄 Predicting..." : "Predict"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Predictor;
