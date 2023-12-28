import React from 'react';

const GridDisplay = ({ gridData, windowSize }) => {
    const margin = 500; // A small margin to reduce the overall grid size
    const numRows = gridData.length;
    const numCols = gridData[0]?.length || 0;

    // Adjusted cell size calculation
    const cellSize = Math.min(
        (windowSize.width - margin) / numCols,
        (windowSize.height - margin) / numRows
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {gridData.map((column, columnIndex) => (
                <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column' }}>
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

export default GridDisplay;
