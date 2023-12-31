import React, { useState, useEffect } from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay';
import SettingsPane from './components/SettingsPane';
import PatternMenu from './components/PatternMenu';

const patterns = {
    "Still Lifes": {
        "Block": [[1, 1], [1, 1]],
        "Bee-Hive": [[0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]],
        "Loaf": [[0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 0]],
        "Boat": [[1, 1, 0], [1, 0, 1], [0, 1, 0]],
        "Tub": [[0, 1, 0], [1, 0, 1], [0, 1, 0]]
    },
    "Oscillators": {
        "Blinker": [[1, 1, 1]],
        "Toad": [[0, 1, 1, 1], [1, 1, 1, 0]],
        "Beacon": [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 0, 1, 1]],
        "Pulsar": [
            [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
        ],
        "Penta-decathlon": [
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
        ]
    },
    "Spaceships": {
        "Glider": [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
        "LWSS (Light-Weight Space Ship)": [[0, 1, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
        "MWSS (Middle-Weight Space Ship)": [[0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 0]],
        "HWSS (Heavy-Weight Space Ship)": [[0, 1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 0]],
        "Gosper glider gun": [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    }
};

function App() {
    // Grids and Initialization
    const [gridModelData, setGridModelData] = useState([]);
    const [gridActualData, setGridActualData] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const initializeGrid = () => {
        const newGrid = new Array(100).fill(null).map(() => new Array(100).fill(0));
        setGridModelData(newGrid);
        setGridActualData(newGrid);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        initializeGrid();
    }, []);


    // Settings

    /// Play
    const [isSimulating, setIsSimulating] = useState(false);

    const toggleSimulation = () => {
        setIsSimulating(!isSimulating);
    };

    /// Pattern

    const [isPatternEnabled, setIsPatternEnabled] = useState(false);

    const togglePattern = () => {
        setIsPatternEnabled(!isPatternEnabled);
    };

    /// Speed

    const [simulationSpeed, setSimulationSpeed] = useState(200);

    const handleSpeedChange = (e) => {
        setSimulationSpeed(e.target.value);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsPatternEnabled(false);
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="App">
            {isPatternEnabled && <PatternMenu togglePattern={togglePattern} patterns={patterns} />}
            <div className="grid-container">
                <div className="grid-wrapper">
                    <h2>Model Prediction</h2>
                    <GridDisplay
                        isSimulating={isSimulating}
                        isEditable={true}
                        gridData={gridModelData}
                        updateGridData={setGridModelData}
                        windowSize={windowSize}
                    />
                </div>

                <div className="settings-container">
                    <SettingsPane
                        toggleSimulation={toggleSimulation}
                        isSimulating={isSimulating}
                        togglePattern={togglePattern}
                        isPatternEnabled={isPatternEnabled}
                        simulationSpeed={simulationSpeed}
                        handleSpeedChange={handleSpeedChange} />
                </div>

                <div className="grid-wrapper">
                    <h2>Actual Simulation</h2>
                    <GridDisplay
                        isSimulating={isSimulating}
                        isEditable={false}
                        gridData={gridActualData}
                        updateGridData={setGridActualData}
                        windowSize={windowSize}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
