import requests

# OpenWeatherMap API Key
API_KEY = "c85895c53bc39d1910be24f0657aa8b2"

def get_weather_data(city):
    """
    Fetch real-time weather data from OpenWeatherMap API.
    """
    try:
        # OpenWeatherMap API endpoint for current weather data
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

        # Send request to API
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200:
            return {"error": "Failed to fetch weather data. Please check the city name or API key."}

        # Extract relevant weather data
        weather_info = {
            "temperature": data["main"]["temp"],  # Temperature in Celsius
            "humidity": data["main"]["humidity"],  # Humidity %
            "pressure": data["main"]["pressure"],  # Atmospheric pressure in hPa
            "wind_speed": data["wind"]["speed"],  # Wind speed in m/s
            "cloud_cover": data["clouds"]["all"],  # Cloud cover %
            "rainfall": data.get("rain", {}).get("1h", 0)  # Rainfall in mm (last 1 hour)
        }

        return weather_info

    except Exception as e:
        return {"error": str(e)}

# Test the function
if __name__ == "__main__":
    city = "Mumbai"  # You can change this to any city
    weather_data = get_weather_data(city)
    print(weather_data)
