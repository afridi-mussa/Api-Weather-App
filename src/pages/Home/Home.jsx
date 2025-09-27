import React, { useState } from "react";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchWeather } from "../../api";
import { FaSearch } from "react-icons/fa";
import History from "../../components/History/History"; 
import "./Home.css";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await fetchWeather(city);

      // Save to history when searched
      let prevHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
      const newEntry = {
        city,
        data,
        timestamp: new Date().toLocaleString(),
      };

      prevHistory = [newEntry, ...prevHistory.filter((h) => h.city !== city)];
      if (prevHistory.length > 5) prevHistory.pop();

      localStorage.setItem("weatherHistory", JSON.stringify(prevHistory));

      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="search-card">
        <h1>Search Weather</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherCard data={weather} />}
      </div>

      
      <History />
    </div>
  );
};

export default Home;
