import requests
import csv
import time

# OpenWeatherMap API Key
API_KEY = "c85895c53bc39d1910be24f0657aa8b2"

# List of selected stations
stations = [
    "Mumbai", "Dadar", "Thane", "Kalyan", "Ambarnath"  # Selected Central Line stations
]

# CSV file to store weather data
CSV_FILE = "mumbai_rail_weather_data.csv"

# Function to fetch weather data
def get_weather_data(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if response.status_code != 200:
        return None

    return {
        "city": city,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "wind_speed": data["wind"]["speed"],
        "cloud_cover": data["clouds"]["all"],
        "rainfall": data.get("rain", {}).get("1h", 0)  # Rainfall in mm (last 1 hour)
    }

# Function to save data to CSV
def save_to_csv(data):
    file_exists = False
    try:
        with open(CSV_FILE, "r") as file:
            file_exists = True
    except FileNotFoundError:
        pass

    with open(CSV_FILE, "a", newline="") as file:
        writer = csv.writer(file)

        # Write header if file is new
        if not file_exists:
            writer.writerow(["city", "temperature", "humidity", "pressure", "wind_speed", "cloud_cover", "rainfall"])

        # Write data
        writer.writerow([data["city"], data["temperature"], data["humidity"], data["pressure"],
                         data["wind_speed"], data["cloud_cover"], data["rainfall"]])

# Main loop to collect data
if __name__ == "__main__":
    while True:
        for city in stations:
            weather_data = get_weather_data(city)
            if weather_data:
                save_to_csv(weather_data)
                print(f"Collected data: {weather_data}")

        print("Waiting for next data collection (10 minutes)...")
        time.sleep(600)  # Wait for 10 minutes before collecting again
