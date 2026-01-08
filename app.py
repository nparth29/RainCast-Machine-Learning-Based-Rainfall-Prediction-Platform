from flask import Flask, request, jsonify
import joblib
import numpy as np
from weather_api import get_weather_data
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load trained models
rf_model = joblib.load("rainfall_rf_model.pkl")
xgb_model = joblib.load("rainfall_xgb_model.pkl")

# Hardcoded evaluation metrics (for Result Dashboard)
model_scores = {
    "RandomForest": {"rmse": 0.6445, "r2": 0.3971},
    "XGBoost": {"rmse": 0.6394, "r2": 0.4067}
}

# Root endpoint
@app.route('/')
def home():
    return "✅ Rainfall Prediction API is running with RF and XGB models!"

# Endpoint for API-based prediction (city name → weather API → prediction)
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        city = data.get("city", None)

        if not city:
            return jsonify({"error": "City name is required"}), 400

        # Fetch real-time weather data using OpenWeatherMap
        weather_data = get_weather_data(city)

        if "error" in weather_data:
            return jsonify({"error": weather_data["error"]}), 500

        # Prepare features for prediction
        features = np.array([[  
            weather_data["temperature"],              # tempC
            weather_data["humidity"],                 # humidity
            weather_data["pressure"],                 # pressure
            weather_data["wind_speed"] * 3.6,          # windspeedKmph
            weather_data["cloud_cover"]                # cloudcover
        ]])

        # Predict with both models
        rf_prediction = max(0, rf_model.predict(features)[0])
        xgb_prediction = max(0, xgb_model.predict(features)[0])

        return jsonify({
            "city": city,
            "predicted_rainfall_mm": {
                "RandomForest": round(float(rf_prediction), 3),
                "XGBoost": round(float(xgb_prediction), 3)
            },
            "weather_data": weather_data,
            "model_scores": model_scores
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ NEW Endpoint for Manual input prediction
@app.route('/manual-predict', methods=['POST'])
def manual_predict():
    try:
        data = request.get_json()

        # Extract manual weather features
        temperature = float(data.get('temperature'))
        humidity = float(data.get('humidity'))
        pressure = float(data.get('pressure'))
        wind_speed = float(data.get('wind_speed')) * 3.6  # m/s → km/h
        cloud_cover = float(data.get('cloud_cover'))

        features = np.array([[temperature, humidity, pressure, wind_speed, cloud_cover]])

        # Predict with both models
        rf_prediction = max(0, rf_model.predict(features)[0])
        xgb_prediction = max(0, xgb_model.predict(features)[0])

        # Structure manual weather data (for frontend)
        weather_data = {
            "temperature": temperature,
            "humidity": humidity,
            "pressure": pressure,
            "wind_speed": float(data.get('wind_speed')),  # Keep it m/s for display
            "cloud_cover": cloud_cover
        }

        return jsonify({
            "city": data.get("city", "Unknown"),
            "predicted_rainfall_mm": {
                "RandomForest": round(float(rf_prediction), 3),
                "XGBoost": round(float(xgb_prediction), 3)
            },
            "weather_data": weather_data,
            "model_scores": model_scores
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
