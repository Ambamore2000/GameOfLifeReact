import React from 'react';
import './SimulationControl.css'; // Import App.css

function SimulationControl({ toggleSimulation, isSimulating, simulationSpeed, handleSpeedChange }) {
    return (
        <div className="simulation-control">
            <button onClick={toggleSimulation}>
                {isSimulating ? 'Pause' : 'Play'}
            </button>
                <h3>Speed</h3>
            <div className="slider-container">
                <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    value={simulationSpeed} 
                    onChange={handleSpeedChange} 
                />
                <span>{simulationSpeed} ms</span>
            </div>
        </div>
    );
}

export default SimulationControl;
