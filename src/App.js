import React, { useState } from "react";
import "./App.css";

const SprinklerCalculator = () => {
  const [yardWidth, setYardWidth] = useState("");
  const [yardLength, setYardLength] = useState("");
  const [sprinklerCoverage, setSprinklerCoverage] = useState(5);
  const [sprinklerLocations, setSprinklerLocations] = useState([]);

  const calculateSprinklerLocations = () => {
    const numSprinklersX = Math.ceil(yardWidth / (2 * sprinklerCoverage));
    const numSprinklersY = Math.ceil(yardLength / (2 * sprinklerCoverage));
    const stepX = yardWidth / (numSprinklersX - 1);
    const stepY = yardLength / (numSprinklersY - 1);

    const locations = [];

    for (let i = 0; i < numSprinklersX; i++) {
      for (let j = 0; j < numSprinklersY; j++) {
        locations.push({
          x: i * stepX,
          y: j * stepY,
        });
      }
    }

    setSprinklerLocations(locations);
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      calculateSprinklerLocations();
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Yard Dimensions</h2>
        <label> Width (yards): </label>
        <input
          type="number"
          value={yardWidth}
          onChange={(e) => setYardWidth(parseFloat(e.target.value))}
          onKeyDown={handleKeyPress}
        />

        <label> Length (yards):</label>
        <input
          type="number"
          value={yardLength}
          onChange={(e) => setYardLength(parseFloat(e.target.value))}
          onKeyDown={handleKeyPress}
        />

        <button onClick={calculateSprinklerLocations}>Calculate</button>  
      </div>
      <h2>Sprinkler Map</h2>
      <div className="yard">
        {sprinklerLocations.map((location, index) => (
          <div
            key={index}
            className="sprinkler-dot"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
          >
            <span className="sprinkler-number">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="table-container">
        <h2>Sprinkler Coordinates</h2>
        <table>
          <thead>
            <tr>
              <th>Sprinkler</th>
              <th>X Coordinate</th>
              <th>Y Coordinate</th>
            </tr>
          </thead>
          <tbody>
            {sprinklerLocations.map((location, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{location.x.toFixed(2)}</td>
                <td>{location.y.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SprinklerCalculator;
