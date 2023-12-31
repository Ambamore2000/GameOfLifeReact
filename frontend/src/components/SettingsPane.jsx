import React from 'react';
import './SettingsPane.css';

const SettingsPane = ({ toggleSimulation, isSimulating, togglePattern, isPatternEnabled, simulationSpeed, handleSpeedChange }) => {
    return (
        <div className="settings-pane">
            <h2>Settings</h2>
            <button onClick={toggleSimulation}>
                {isSimulating ? 'Pause' : 'Play'}
            </button>
            <br></br>
            <button onClick={togglePattern}>
                {isPatternEnabled ? 'Close Pattern Menu' : 'Open Pattern Menu'}
            </button>
            <br></br>
            <input
                type="range"
                min="100"
                max="1000"
                value={simulationSpeed}
                onChange={handleSpeedChange}
            />
            <span>{simulationSpeed} ms</span>
        </div>
    );
};

export default SettingsPane;
