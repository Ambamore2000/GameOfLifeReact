import React, { useState, useEffect } from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay'; // Import GridDisplay
import SettingsPane from './components/SettingsPane'; // Import GridDisplay

function App() {
    const [gridModelData, setGridModelData] = useState([]);
    const [gridActualData, setGridActualData] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [isSimulating, setIsSimulating] = useState(false);

    // Function to initialize an empty 100x100 grid
    const initializeGrid = () => {
        const newGrid = new Array(100).fill(null).map(() => new Array(100).fill(0));
        setGridModelData(newGrid);
        setGridActualData(newGrid); // Initialize both grids
    };

    // Update window size on resize
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

    // Initialize grids on component mount
    useEffect(() => {
        initializeGrid();
    }, []);


    const handlePlayClick = () => {
        // Define the actions to be taken when the Play button is clicked
    };

    return (
        <div className="App">
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
                    <SettingsPane onPlayClick={handlePlayClick} />
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
