import { useState } from "react";
import "./AppStyle.css"; // Assuming you have a CSS file named App.css for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faDroplet,
  faCloud,
  faSun,
  faSnowflake,
  faThunderstorm,
  faCloudRain,
  faCloudShowersHeavy,
  faSmog,
  faCloudSun,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const getWeatherData = async () => {
    const API_KEY = "e5f7813cc945da1b2f05c57074f9044e";
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({
      q: city,
      appid: API_KEY,
      units: "metric", // or 'imperial' for Fahrenheit
    });

    const getCurrentDate = (timezoneOffset) => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const currentDate = new Date();

      // Adjust the date based on the provided timezone offset
      const utc =
        currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
      const localDate = new Date(utc + 1000 * timezoneOffset);

      return localDate.toLocaleDateString("en-US", options);
    };

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, "allladatasss");

      let MT = Math.round(data.main.temp);
      let FL = Math.round(data.main.feels_like);

      const weather = {
        location: `Weather in ${data.name}`,
        temperature: ` ${MT}`,
        feels_like: `Feels Like: ${FL}`,
        humidity: `Humidity: ${data.main.humidity} %`,
        wind: `Wind: ${data.wind.speed} km/h`,
        condition: `${data.weather[0].description}`,
        date: getCurrentDate(data.timezone),
      };

      setWeatherInfo(weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };


  // Function to choose appropriate icon based on weather condition
  const chooseWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return faSun;
      case "clouds":
        return faCloud;
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return faSnowflake;
      case "snow":
        return faSnowflake;
      default:
        return faSun; // Default icon
    }
  };
  

  return (
    <div className="AppStyle">
      <h1>
        <FontAwesomeIcon icon={faSun} />
        AccuWeather
      </h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeatherData}>Get Weather</button>
      {weatherInfo && (
        <div className="weather-container">
          <div className="weather-info">
            <h3 className="location">{weatherInfo.location}</h3>
            <p>{weatherInfo.date}</p>
            <p className="temp">
              {weatherInfo.temperature}&#176;C
              <FontAwesomeIcon icon={chooseWeatherIcon(weatherInfo.condition)} />
            </p>
            <p className="weather">{weatherInfo.condition}</p>
            <p>{weatherInfo.feels_like}&#176;C</p>
            <p>
              {weatherInfo.humidity}
              <FontAwesomeIcon
                icon={faDroplet}
                style={{ marginLeft: "10px" }}
              />
            </p>

            <p>
              {weatherInfo.wind}
              <FontAwesomeIcon icon={faWind} style={{ marginLeft: "10px" }} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
