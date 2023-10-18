import React from "react";
import "./WeeklyData.css";
import weatherApi from "../../util/weatherApi";

const WeeklyData = ({ forecastWeekly }) => {
  const getWeeklyData = (forecastWeekly) => {
    return weatherApi.getWeeklyData(forecastWeekly);
  };

  const weeklyData = getWeeklyData(forecastWeekly);

  return (
    <div className="row rowWeeklyData">
      <div className="table-responsive">
        <table className="table table-borderless">
          <tbody>
            <tr>
              {weeklyData.map((forecast) => (
                <td key={forecast.weekday}>{forecast.weekday}</td>
              ))}
            </tr>
            <tr>
              {weeklyData.map((forecast) => (
                <td key={forecast.weekday} className="weeklyData">
                  <img src={forecast.weather_icon} alt="" />
                </td>
              ))}
            </tr>
            <tr>
              {weeklyData.map((forecast) => (
                <td key={forecast.weekday} className="weeklyData">
                  {forecast.max}° | {forecast.min}°
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyData;
