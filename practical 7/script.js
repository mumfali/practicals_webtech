let cityInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");
let weatherResult = document.getElementById("weatherResult");

// Event listener for search button
searchButton.addEventListener("click", function() {
    let city = cityInput.value.trim();
    
    // Validate empty input
    if(city == "") {
        weatherResult.innerHTML = "<p>Please enter a city.</p>";
        return;
    }
    
    // Call the async function
    getWeather(city);
});

// Async function to fetch weather data
async function getWeather(city) {
    // Show loading message
    weatherResult.innerHTML = "<p>Loading...</p>";
    
    try {
        // PART 1: Geocoding API Request
        // Convert city name to latitude and longitude
        let geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name="
            + encodeURIComponent(city) + "&count=1";
        
        let geoResponse = await fetch(geoUrl);
        let geoData = await geoResponse.json();
        
        // Check if city was found
        if(!geoData.results) {
            weatherResult.innerHTML = "<p>City not found.</p>";
            return;
        }
        
        // Extract latitude and longitude
        let location = geoData.results[0];
        let latitude = location.latitude;
        let longitude = location.longitude;
        
        // PART 2: Weather API Request
        // Use coordinates to fetch current weather
        let weatherUrl = "https://api.open-meteo.com/v1/forecast"
            + "?latitude=" + latitude
            + "&longitude=" + longitude
            + "&current=temperature_2m,relative_humidity_2m,"
            + "weather_code,wind_speed_10m";
        
        let weatherResponse = await fetch(weatherUrl);
        let weatherData = await weatherResponse.json();
        
        // Extract weather information
        let current = weatherData.current;
        let temperature = current.temperature_2m;
        let humidity = current.relative_humidity_2m;
        let windSpeed = current.wind_speed_10m;
        let weatherCode = current.weather_code;
        
        // PART 3: Display data using DOM
        weatherResult.innerHTML =
            "<h2>" + location.name + "</h2>" +
            "<p><strong>Country:</strong> " + location.country + "</p>" +
            "<p><strong>Temperature:</strong> " + temperature + " °C</p>" +
            "<p><strong>Humidity:</strong> " + humidity + " %</p>" +
            "<p><strong>Wind Speed:</strong> " + windSpeed + " km/h</p>" +
            "<p><strong>Weather Code:</strong> " + weatherCode + "</p>";
        
    }
    catch(error) {
        // PART 4: Error handling
        weatherResult.innerHTML = "<p>Unable to fetch weather data.</p>";
        console.log(error);
    }
}
