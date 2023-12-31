import React from 'react';
import './GridDisplay.css'; // Import the new CSS file

const GridDisplay = ({ isSimulating, isEditable, gridData, updateGridData, windowSize }) => {
    const margin = 150; // A small margin to reduce the overall grid size
    const numRows = gridData.length;
    const numCols = gridData[0]?.length || 0;

    // Adjusted cell size calculation
    const cellSize = Math.min(
        (windowSize.width - margin) / 2 / numCols,
        (windowSize.height - margin) / numRows
    );
    const toggleCellState = (row, col) => {
        const newGrid = JSON.parse(JSON.stringify(gridData)); // Use gridData
        newGrid[row][col] = gridData[row][col] ? 0 : 1; // Toggle the cell state
        updateGridData(newGrid); // Update the grid state using updateGridData
    };

    const handleCellClick = (row, col) => {
        if (!isSimulating && isEditable) {
            toggleCellState(row, col);
        }
    };

    return (
        <div className="grid-container">
            {gridData.map((column, columnIndex) => (
                <div key={columnIndex} className="grid-column">
                    {column.map((cell, cellIndex) => (
                        <div key={`${columnIndex}-${cellIndex}`} onClick={() => handleCellClick(columnIndex, cellIndex)}
                            className={`grid-cell ${cell === 1 ? 'grid-cell-active' : ''}`}
                            style={{
                                width: `${cellSize}px`,
                                height: `${cellSize}px`,
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GridDisplay;
