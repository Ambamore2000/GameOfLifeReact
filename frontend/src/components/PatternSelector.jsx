import React from 'react';

function PatternSelector({ patterns, selectedPatternCategory, setSelectedPatternCategory, selectedPatternName, setSelectedPatternName, patternPosition, setPatternPosition, patternRotation, setPatternRotation, placePatternOnGrid }) {
    return (
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
            <input type="number" value={patternPosition.x} onChange={e => setPatternPosition({ ...patternPosition, x: parseInt(e.target.value) })} />
            <input type="number" value={patternPosition.y} onChange={e => setPatternPosition({ ...patternPosition, y: parseInt(e.target.value) })} />
            <select value={patternRotation} onChange={e => setPatternRotation(parseInt(e.target.value))}>
                {[0, 90, 180, 270].map(deg => (
                    <option key={deg} value={deg}>{deg}°</option>
                ))}
            </select>
            <button onClick={placePatternOnGrid}>Place Pattern</button>
        </div>
    );
}

export default PatternSelector;
