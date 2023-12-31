import React, { useState, useEffect } from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay'; // Import GridDisplay

function App() {
    const [gridAData, setGridAData] = useState([]); // State for gridA data
    const [gridBData, setGridBData] = useState([]); // State for gridB data
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [isSimulating, setIsSimulating] = useState(false);

    // Function to initialize an empty 100x100 grid
    const initializeGrid = () => {
        const newGrid = new Array(100).fill(null).map(() => new Array(100).fill(0));
        setGridAData(newGrid);
        setGridBData(newGrid); // Initialize both grids
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

    return (
        <div className="App">
            <div className="grid-container">
                <div className="grid-wrapper">
                    <h2>Grid A</h2>
                    <GridDisplay
                        isSimulating={isSimulating}
                        gridData={gridAData}
                        updateGridData={setGridAData}
                        windowSize={windowSize}
                    />
                </div>

                <div className="grid-wrapper">
                    <h2>Grid B</h2>
                    <GridDisplay
                        isSimulating={isSimulating}
                        gridData={gridBData}
                        updateGridData={setGridBData}
                        windowSize={windowSize}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
