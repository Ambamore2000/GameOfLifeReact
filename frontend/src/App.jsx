import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatternSelector from './components/PatternSelector';
import SimulationControl from './components/SimulationControl';
import GridDisplay from './components/GridDisplay';
import './App.css'; // Import App.css

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
    // State declarations and initializations
    const [grid, setGrid] = useState([]);
    const [isGridInitialized, setIsGridInitialized] = useState(false);
    const [actualPrediction, setActualPrediction] = useState([]);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationSpeed, setSimulationSpeed] = useState(200);
    const [selectedPatternCategory, setSelectedPatternCategory] = useState('Spaceships');
    const [selectedPatternName, setSelectedPatternName] = useState('Gosper glider gun');
    const [patternPosition, setPatternPosition] = useState({ x: 2, y: 2 });
    const [patternRotation, setPatternRotation] = useState(90);
    const [showBothGrids, setShowBothGrids] = useState(true);
    const toggleSimulation = () => {
        setIsSimulating(!isSimulating);
    };
    const handleShowBothGridsToggle = () => {
        setShowBothGrids(!showBothGrids);
    };
    useEffect(() => {
        // Window resize handler
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        initializeGrid();
    }, []);

    useEffect(() => {
        if (isGridInitialized) {
            // Place the pattern once the grid is initialized
            placePatternOnGrid();
        }
    }, [isGridInitialized]);

    useEffect(() => {
        // Interval for simulation and prediction
        let interval;
        if (isSimulating) interval = setInterval(simulateAndPredict, simulationSpeed);
        return () => clearInterval(interval);
    }, [isSimulating, grid, simulationSpeed]);

    const initializeGrid = async () => {
        try {
            const response = await axios.get('http://localhost:8000/initialize/');
            setGrid(response.data.grid);
            setActualPrediction(response.data.grid);
            setIsGridInitialized(true); // Set to true once the grid is initialized
        } catch (error) {
            console.error('Error initializing grid:', error);
        }
    };

    const simulateAndPredict = async () => {
        // Prevent new simulation if the previous one is still processing
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            const modelPromise = axios.post('http://localhost:8000/model_predict/', { data: grid });
            const actualPromise = axios.post('http://localhost:8000/actual_predict/', { data: grid });

            const [modelResponse, actualResponse] = await Promise.all([modelPromise, actualPromise]);

            setGrid(modelResponse.data.prediction);
            setActualPrediction(actualResponse.data.prediction);
        } catch (error) {
            console.error('Error in model or actual prediction:', error);
            setIsSimulating(false); // Stop the simulation on error
        } finally {
            setIsProcessing(false); // Allow new simulation
        }
    };

    const placePatternOnGrid = () => {
        const pattern = patterns[selectedPatternCategory][selectedPatternName];
        const rotatedPattern = rotatePattern(pattern, patternRotation);
        const newGrid = grid.map(row => row.slice()); // Clone the grid

        for (let i = 0; i < rotatedPattern.length; i++) {
            for (let j = 0; j < rotatedPattern[i].length; j++) {
                const x = patternPosition.x + i;
                const y = patternPosition.y + j;
                if (x < grid.length && y < grid[0].length) {
                    newGrid[x][y] = rotatedPattern[i][j];
                }
            }
        }

        setGrid(newGrid);
    };

    const rotatePattern = (pattern, degree) => {
        // Rotation logic
        if (degree === 90) {
            return pattern[0].map((_, index) => pattern.map(row => row[index]).reverse());
        }
        // Additional rotation logic can be added here
        return pattern;
    };

    const handleSpeedChange = (e) => {
        setSimulationSpeed(e.target.value);
    };

    return (
        <div className="app-container">
            <SimulationControl
                toggleSimulation={toggleSimulation}
                isSimulating={isSimulating}
                simulationSpeed={simulationSpeed}
                handleSpeedChange={handleSpeedChange}
            />
            
            {/* Toggle for showing both grids */}
            <div className="toggle-container">
                <label>
                <input
                    type="checkbox"
                    checked={showBothGrids}
                    onChange={handleShowBothGridsToggle}
                />
                Show Both Grids
                </label>
            </div>

            <PatternSelector
                patterns={patterns}
                selectedPatternCategory={selectedPatternCategory}
                setSelectedPatternCategory={setSelectedPatternCategory}
                selectedPatternName={selectedPatternName}
                setSelectedPatternName={setSelectedPatternName}
                patternPosition={patternPosition}
                setPatternPosition={setPatternPosition}
                patternRotation={patternRotation}
                setPatternRotation={setPatternRotation}
                placePatternOnGrid={placePatternOnGrid}
            />

            <div className="grid-container">
              {showBothGrids ? (
                <>
                  <div className="grid-section">
                    <h2>Model Prediction</h2>
                    <GridDisplay gridData={grid} windowSize={windowSize} />
                  </div>
                  <div>
                    <h2>Actual Prediction</h2>
                    <GridDisplay gridData={actualPrediction} windowSize={windowSize} />
                  </div>
                </>
              ) : (
                <div>
                  <h2>Model Prediction</h2>
                  <GridDisplay gridData={grid} windowSize={windowSize} />
                </div>
              )}
            </div>
        </div>
    );
}

export default App;
