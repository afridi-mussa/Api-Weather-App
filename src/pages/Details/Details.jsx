import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWeather } from "../../api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

//  Import icons
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaTemperatureHigh, FaFlag } from "react-icons/fa";
import { MdOutlineWbSunny, MdOutlineCloud, MdOutlineGrain } from "react-icons/md";

import "./Details.css";

const Details = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(city);
        setWeather(data);

        //  Save search history (max 5)
        let prevHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
        const newEntry = {
          city,
          data,
          timestamp: new Date().toLocaleString(),
        };

        prevHistory = [newEntry, ...prevHistory.filter((h) => h.city !== city)];
        if (prevHistory.length > 5) prevHistory.pop();

        localStorage.setItem("weatherHistory", JSON.stringify(prevHistory));
        setHistory(prevHistory);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, [city]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(storedHistory);
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  //  Pick condition icon dynamically
  const getConditionIcon = (condition) => {
    const lower = condition.toLowerCase();
    if (lower.includes("cloud")) return <MdOutlineCloud className="icon" />;
    if (lower.includes("rain")) return <MdOutlineGrain className="icon" />;
    if (lower.includes("sun") || lower.includes("clear"))
      return <MdOutlineWbSunny className="icon" />;
    return <MdOutlineWbSunny className="icon" />;
  };

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>

      {/*  View History Button */}
      <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "View History"}
      </button>

      <h1>Weather Details for {city}</h1>

      {weather && (
        <div className="details-card">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="details-icon"
          />
          <p className="temp-big">{Math.round(weather.main.temp)}°C</p>

          {/* Weather details with icons */}
          <div className="detail-item">
            <WiHumidity className="icon" /> Humidity: {weather.main.humidity}%
          </div>
          <div className="detail-item">
            {getConditionIcon(weather.weather[0].main)} Condition: {weather.weather[0].description}
          </div>
          <div className="detail-item">
            <FaFlag className="icon" /> Country: {weather.sys.country}
          </div>
          <div className="detail-item">
            <FaTemperatureHigh className="icon" /> Feels like: {Math.round(weather.main.feels_like)}°C
          </div>
          <div className="detail-item">
            <WiStrongWind className="icon" /> Wind: {weather.wind.speed} m/s
          </div>
        </div>
      )}

    </div>
  );
};

export default Details;
