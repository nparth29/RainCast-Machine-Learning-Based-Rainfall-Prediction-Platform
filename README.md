# RainCast — Machine Learning Rainfall Prediction

**One line:** Full-stack prototype that predicts short-term rainfall (mm) using **RandomForest** and **XGBoost**, served via a Flask API with a React + `react-three-fiber` dashboard.

---

## What’s in this project
- **Backend:** `app.py` (Flask API) + `weather_api.py` (fetches live weather)  
- **Models / Notebook:** `rainfall_prediction.ipynb` → trains models and saves `.pkl` files  
- **Data:** `rainfall_dataset.csv` (Mumbai + Pune)  
- **Frontend:** `rainfall-predictor/` — React app with custom three.js scene and UI components  
- **Models used:** RandomForest & XGBoost — both compared side-by-side in the dashboard

**Stack / tools:** Python, Flask, scikit-learn, XGBoost, joblib, pandas, NumPy, React, react-three-fiber, axios.

**Limitations:** Trained on **Mumbai & Pune** only — not generalizable to other regions without retraining.

---

## Quick start (3 steps)
1. **Get model files**  
   - Run the notebook to generate:  
     ```py
     # in Jupyter / VSCode
     joblib.dump(rf_model, 'rainfall_rf_model.pkl')
     joblib.dump(xgb_model, 'rainfall_xgb_model.pkl')
     ```  
   - Place both `.pkl` files in the repo root (next to `app.py`).  
   *(If you have prebuilt `.pkl` files, drop them in the same place.)*

2. **Backend (start server)**
   install the required dependencies
   Before running the backend, you must create your **OpenWeatherMap API key** and add it to the backend files.

   #### Create OpenWeatherMap API key
   1. Go to: https://openweathermap.org/
   2. Sign up or log in
   3. Navigate to **My API Keys**
   4. Generate a new API key

   #### Add API key to backend files
   Open the following files and place your API key where indicated:

   - `weather_api.py`
   - `data_collector.py`

   Example:
   ```python
   API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"
   ```
   then run : 
   ```bash
   python app.py
   ```
   The API runs at http://127.0.0.1:5000.

   ---
4. **Frontend**
   in new terminal :
   ```bash
   cd rainfall-predictor
   npm install
   npm start
   ```

---

**Troubleshooting**

- Missing .pkl → backend fails to load models. Generate them.
- error in backend → make sure all the dependencies are installed.
- Python package errors → use Python 3.8–3.11, pin numpy<2.0 if required.
- Frontend: run npm install if react-scripts not found.
