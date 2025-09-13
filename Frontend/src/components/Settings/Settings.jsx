import React, { useState } from "react";
import "./Settings.css";

const Settings = ({ temperature, setTemperature }) => {
  const [localTemp, setLocalTemp] = useState(temperature || 0.5);

  const handleTempChange = (e) => {
    const value = parseFloat(e.target.value);
    setLocalTemp(value);
    setTemperature && setTemperature(value);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="setting-item">
        <label htmlFor="temperature">Temperature</label>
        <input
          type="range"
          id="temperature"
          min={0}
          max={1}
          step={0.01}
          value={localTemp}
          onChange={handleTempChange}
        />
        <span className="temp-value">{localTemp}</span>
      </div>
    </div>
  );
};

export default Settings;
