import React, { useState, useEffect } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaTemperatureHigh, FaFlag } from "react-icons/fa";
import { MdOutlineWbSunny, MdOutlineCloud, MdOutlineGrain } from "react-icons/md";
import "./History.css";

const History = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(storedHistory);
  }, []);

 
  const getConditionIcon = (condition) => {
    const lower = condition.toLowerCase();
    if (lower.includes("cloud")) return <MdOutlineCloud className="icon" />;
    if (lower.includes("rain")) return <MdOutlineGrain className="icon" />;
    if (lower.includes("sun") || lower.includes("clear"))
      return <MdOutlineWbSunny className="icon" />;
    return <MdOutlineWbSunny className="icon" />;
  };

  //  Reset history
  const resetHistory = () => {
    localStorage.removeItem("weatherHistory");
    setHistory([]);
  };

  return (
    <div className="history-wrapper">
     
      <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "View History"}
      </button>

      {/* History section */}
      {showHistory && (
        <div className="history-container">
          <h2>Last 5 Searches</h2>
          {history.length === 0 ? (
            <p>No history yet.</p>
          ) : (
            <>
              <div className="history-grid">
                {history.map((item, index) => (
                  <div key={index} className="history-card">
                    <h3>
                      {item.city} ({item.timestamp})
                    </h3>
                    <p>
                      <FaTemperatureHigh className="icon" /> <strong>Temp:</strong>{" "}
                      {Math.round(item.data.main.temp)}°C
                    </p>
                    <p>
                      <WiHumidity className="icon" /> <strong>Humidity:</strong>{" "}
                      {item.data.main.humidity}%
                    </p>
                    <p>
                      {getConditionIcon(item.data.weather[0].main)} <strong>Condition:</strong>{" "}
                      {item.data.weather[0].description}
                    </p>
                    <p>
                      <FaFlag className="icon" /> <strong>Country:</strong>{" "}
                      {item.data.sys.country}
                    </p>
                    <p>
                      <FaTemperatureHigh className="icon" /> <strong>Feels Like:</strong>{" "}
                      {Math.round(item.data.main.feels_like)}°C
                    </p>
                    <p>
                      <WiStrongWind className="icon" /> <strong>Wind:</strong>{" "}
                      {item.data.wind.speed} m/s
                    </p>
                  </div>
                ))}
              </div>

              {/*  Reset button */}
              <button className="reset-btn" onClick={resetHistory}>
                Reset History
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
