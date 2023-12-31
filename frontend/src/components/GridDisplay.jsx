import React from 'react';

const GridDisplay = ({ isSimulating, gridData, updateGridData, windowSize }) => {
    const margin = 0; // A small margin to reduce the overall grid size
    const numRows = gridData.length;
    const numCols = gridData[0]?.length || 0;

    // Adjusted cell size calculation
    const cellSize = Math.min(
        (windowSize.width - margin) / numCols,
        (windowSize.height - margin) / numRows
    );
    const toggleCellState = (row, col) => {
        const newGrid = JSON.parse(JSON.stringify(gridData)); // Use gridData
        newGrid[row][col] = gridData[row][col] ? 0 : 1; // Toggle the cell state
        updateGridData(newGrid); // Update the grid state using updateGridData
    };

    const handleCellClick = (row, col) => {
        if (!isSimulating) {
            toggleCellState(row, col);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {gridData.map((column, columnIndex) => (
                <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column' }}>
                    {column.map((cell, cellIndex) => (
                        <div key={`${columnIndex}-${cellIndex}`} onClick={() => handleCellClick(columnIndex, cellIndex)}
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

export default GridDisplay;
