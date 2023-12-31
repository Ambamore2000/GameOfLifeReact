import React, { useState } from 'react';

const PatternMenu = ({ togglePattern, patterns }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');

  const handleOverlayClick = (e) => {
    togglePattern();
  };

  const handlePaneClick = (e) => {
    e.stopPropagation();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedPattern(''); // Reset the pattern selection when category changes
  };

  const handlePatternChange = (e) => {
    setSelectedPattern(e.target.value);
  };

  const renderDropdown = () => (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {Object.keys(patterns).map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {selectedCategory && (
        <select value={selectedPattern} onChange={handlePatternChange}>
          <option value="">Select Pattern</option>
          {Object.keys(patterns[selectedCategory]).map((pattern) => (
            <option key={pattern} value={pattern}>{pattern}</option>
          ))}
        </select>
      )}
    </div>
  );

  const renderPatternGrid = () => {
    if (!selectedPattern) return null;

    const grid = patterns[selectedCategory][selectedPattern];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 20px)`, gap: '5px', marginTop: '20px' }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div key={`${rowIndex}-${cellIndex}`} style={{ width: '20px', height: '20px', backgroundColor: cell ? 'black' : 'white', border: '1px solid gray' }} />
          ))
        )}
      </div>
    );
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleOverlayClick}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '80%', maxWidth: '500px' }} onClick={handlePaneClick}>
        {renderDropdown()}
        {renderPatternGrid()}
      </div>
    </div>
  );
};

export default PatternMenu;
