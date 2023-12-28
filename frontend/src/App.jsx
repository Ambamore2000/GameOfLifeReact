import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    // Define grid dimensions
    const gridRows = 100; // Number of rows
    const gridCols = 100; // Number of columns
    const [grid, setGrid] = useState([]);
    const [actualPrediction, setActualPrediction] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationSpeed, setSimulationSpeed] = useState(200); // Default speed in milliseconds

    const [selectedPatternCategory, setSelectedPatternCategory] = useState('Still Lifes');
    const [selectedPatternName, setSelectedPatternName] = useState('Block');
    const [patternPosition, setPatternPosition] = useState({ x: 0, y: 0 });
    const [patternRotation, setPatternRotation] = useState(0); // Degrees: 0, 90, 180, 270

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let interval;
        if (isSimulating) {
            interval = setInterval(simulateAndPredict, simulationSpeed);
        }
        return () => clearInterval(interval);
    }, [isSimulating, grid, simulationSpeed]); // Add simulationSpeed to the dependencies array

    const initializeGrid = async () => {
        try {
            const response = await axios.get('http://localhost:8000/initialize/');
            setGrid(response.data.grid);
            setActualPrediction(response.data.grid);
            //console.log(response.data.grid);
        } catch (error) {
            console.error('Error initializing grid:', error);
        }
    };

    const simulateAndPredict = async () => {
        if (isProcessing) return; // Prevent new simulation if the previous one is still processing
        setIsProcessing(true);

        try {
            const modelPromise = axios.post('http://localhost:8000/model_predict/', { data: grid });
            const actualPromise = axios.post('http://localhost:8000/actual_predict/', { data: grid });

            const [modelResponse, actualResponse] = await Promise.all([modelPromise, actualPromise]);

            setGrid(modelResponse.data.prediction);
            setActualPrediction(actualResponse.data.prediction);

            //console.log(modelResponse.data.prediction);
            //console.log(actualResponse.data.prediction);
        } catch (error) {
            console.error('Error in model or actual prediction:', error);
            setIsSimulating(false); // Stop the simulation on error
        } finally {
            setIsProcessing(false); // Allow new simulation
        }
    };

    const toggleSimulation = () => {
        setIsSimulating(!isSimulating);
    };

    const renderGrid = (gridData) => {
        const cellSize = Math.min(
            windowSize.width / gridData.length, // Adjusted for column layout
            windowSize.height / gridData[0]?.length
        );

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}> {/* Rows for columns */}
                {gridData.map((column, columnIndex) => (
                    <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column' }}> {/* Columns */}
                        {column.map((cell, cellIndex) => (
                            <div key={`${columnIndex}-${cellIndex}`}
                                style={{
                                    width: `${cellSize}px`,
                                    height: `${cellSize}px`,
                                    backgroundColor: cell === 1 ? 'black' : 'white'
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        );
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
        // Add logic to rotate the pattern based on the degree
        // For simplicity, here is the rotation by 90 degrees
        if (degree === 90) {
            return pattern[0].map((val, index) => pattern.map(row => row[index]).reverse());
        }
        // Implement other rotations as needed
        return pattern;
    };

    const handleSpeedChange = (e) => {
        setSimulationSpeed(e.target.value);
    };
    return (
        <div>
            <button onClick={initializeGrid}>Initialize Grid</button>
            <button onClick={toggleSimulation}>
                {isSimulating ? 'Pause Simulation' : 'Start Simulation'}
            </button>

            <div>
                <h2>Place a Pattern</h2>
                <select value={selectedPatternCategory} onChange={e => setSelectedPatternCategory(e.target.value)}>
                    {Object.keys(patterns).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select value={selectedPatternName} onChange={e => setSelectedPatternName(e.target.value)}>
                    {Object.keys(patterns[selectedPatternCategory]).map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
                <input type="number" value={patternPosition.x} onChange={e => setPatternPosition({...patternPosition, x: parseInt(e.target.value)})} />
                <input type="number" value={patternPosition.y} onChange={e => setPatternPosition({...patternPosition, y: parseInt(e.target.value)})} />
                <select value={patternRotation} onChange={e => setPatternRotation(parseInt(e.target.value))}>
                    {[0, 90, 180, 270].map(deg => (
                        <option key={deg} value={deg}>{deg}°</option>
                    ))}
                </select>
                <button onClick={placePatternOnGrid}>Place Pattern</button>
            </div>

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

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{ marginRight: '20px' }}>
                    <h2>Model Prediction</h2>
                    {renderGrid(grid)}
                </div>
                <div>
                    <h2>Actual Prediction</h2>
                    {renderGrid(actualPrediction)}
                </div>
            </div>
        </div>
    );
}

export default App;
