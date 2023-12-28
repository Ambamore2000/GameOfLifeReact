import React from 'react';

function SimulationControl({ toggleSimulation, isSimulating, simulationSpeed, handleSpeedChange }) {
    return (
        <div>
            <button onClick={toggleSimulation}>
                {isSimulating ? 'Pause Simulation' : 'Start Simulation'}
            </button>
            <div>
                <h2>Adjust Simulation Speed</h2>
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
