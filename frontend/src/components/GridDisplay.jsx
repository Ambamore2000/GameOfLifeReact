import React from 'react';

function GridDisplay({ gridData, windowSize }) {
    const renderGrid = (gridData) => {
        const cellSize = Math.min(
            windowSize.width / gridData.length,
            windowSize.height / gridData[0]?.length
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

    return renderGrid(gridData);
}

export default GridDisplay;
