import React from 'react';
import './SettingsPane.css';

const SettingsPane = ({ toggleSimulation, isSimulating, togglePattern, isPatternEnabled }) => {
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
            {/* Additional settings can be added here later */}
        </div>
    );
};

export default SettingsPane;
