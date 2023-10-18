import React, { useState } from "react";
import "./TodayData.css";
import WeeklyData from "../WeeklyData/WeeklyData";
import GetGraph from "../GetGraph/GetGraph";

const TodayData = (props) => {
  const [showMore, setShowMore] = useState(false);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className=" container weatherData w-75 border rounded" id="12">
      <div className="row currentCity justify-content-left">
        {props.city}, {props.country}
      </div>

      <div className="row currentDay">
        {props.weekday} {props.time}
      </div>

      <div className="row currentDesc justify-content-left">
        {props.weatherDescription}
      </div>

      <div className="row currentTemp justify-content-left">
        {props.temp}°
        
      </div>

      <div className="row currentTemp justify-content-left">
        <button onClick={toggleMore}>See more</button>
      </div>

      {showMore && (
        <div>
          <GetGraph forecast3hrs={props.forecast3hrs} />
          <WeeklyData forecastWeekly={props.forecastWeekly} />
        </div>
      )}
    </div>
  );
};

export default TodayData;
