import React, { useState, useEffect } from "react";
import "./App.css";
import weatherApi from "../../util/weatherApi";
import SearchBar from "../SearchBar/SearchBar";
import TodayData from "../TodayData/TodayData";

const App = () => {
  const [weatherData, setWeatherData] = useState({
    firstTime: true,
    city: "",
    weekday: "",
    temp: "",
    weatherDescription: "",
    weatherIcon: "",
    country: "",
    timezone: "",
    time: "",
    forecast3hrs: [],
    forecastWeekly: []
  });

  const updateTodayState = (data) => {
    setWeatherData((prevData) => ({
      ...prevData,
      firstTime: false,
      temp: data.temp,
      weatherDescription: data.weatherDescription,
      weatherIcon: data.weatherIcon,
      country: data.country,
      timezone: data.timezone,
      time: data.time,
      weekday: data.weekday,
      city: data.city
    }));
  };

  const updateWeeklyState = (data) => {
    setWeatherData((prevData) => ({
      ...prevData,
      forecastWeekly: data,
      forecast3hrs: data.slice(0, 8)
    }));
  };

  const search = (term) => {
    weatherApi.getTodayData(term).then((data) => updateTodayState(data));
    weatherApi.get3HoursData(term).then((data) => updateWeeklyState(data));
  };

  const warningBanner = () => {
    if (weatherData.firstTime) {
      return null;
    }

    return (
      <div className="warningBanner">
        We couldn’t find any results. Try checking your spelling.
      </div>
    );
  };

  const displayResult = () => {
    return typeof weatherData.city !== "undefined" && weatherData.city !== "";
  };

  return (
    <div className="main">
      <div className="navbar-main">
        <h1>Weather</h1>

      </div>
      
      <SearchBar onSearch={search} />
      {displayResult() ? (
        <TodayData
          city={weatherData.city}
          country={weatherData.country}
          temp={weatherData.temp}
          time={weatherData.time}
          weekday={weatherData.weekday}
          weatherDescription={weatherData.weatherDescription}
          weatherIcon={weatherData.weatherIcon}
          forecast3hrs={weatherData.forecast3hrs}
          forecastWeekly={weatherData.forecastWeekly}
        />
      ) : (
        warningBanner()
      )}
    </div>
  );
};

export default App;
