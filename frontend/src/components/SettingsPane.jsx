import React from 'react';
import './SettingsPane.css';

const SettingsPane = ({ onPlayClick }) => {
    return (
        <div className="settings-pane">
            <h2>Settings</h2>
            <button onClick={onPlayClick}>Play</button>
            {/* Additional settings can be added here later */}
        </div>
    );
};

export default SettingsPane;
