import React from "react";
import { useNavigate } from "react-router-dom";
import "./WeatherCard.css";

const WeatherCard = ({ data }) => {
  const navigate = useNavigate();
  const icon = data.weather[0].icon;

  const handleClick = () => {
    navigate(`/details/${data.name}`);
  };

  return (
    <div className="weather-card" onClick={handleClick}>
      <h2>{data.name}, {data.sys.country}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={data.weather[0].description}
        className="weather-icon"
      />
      <p className="temp">{Math.round(data.main.temp)}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p className="condition">{data.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
