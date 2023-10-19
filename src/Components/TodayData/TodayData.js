import React, { useState } from "react";
import "./TodayData.css";
import WeeklyData from "../WeeklyData/WeeklyData";
import GetGraph from "../GetGraph/GetGraph";

const TodayData = (props) => {
  const [showMore, setShowMore] = useState(false);

  const buttonStyles = {
    width: '250px',
    height: '50px',
    border: 'transparent',
    borderRadius: '52px',
    background: '5px 5px 10px #1b328a',
    boxShadow: '-5px -5px 10px #213da8',

    // Add other styles or hover effects as needed
  };


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

      <div className="row justify-content-center">
      <button onClick={toggleMore} style={buttonStyles} >See more</button>
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
