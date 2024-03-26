import React, { useState, useRef } from 'react';
import './SeatDrawing.css';

const SeatDrawing = () => {
    const [seat , setSeat] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lines, setLines] = useState([]);
    const [clickedPoints, setClickedPoints] = useState(new Set());
    const drawingAreaRef = useRef(null);
    const startPointRef = useRef(null);

    const handleMouseDown = (event) => {
        if (!isDrawing && !seat) return;
        setIsDrawing(true);
        const { offsetX, offsetY } = event.nativeEvent;
        startPointRef.current = { x: offsetX, y: offsetY };
        setLines((prevLines) => [...prevLines, [{ x: offsetX, y: offsetY }]]);
    };

    const handleMouseMove = (event) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = event.nativeEvent;
        const distanceX = offsetX - startPointRef.current?.x;
        const distanceY = offsetY - startPointRef.current?.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const numPoints = Math.floor(distance / 25);
        const line = [];
        for (let i = 0; i < numPoints; i++) {
            const ratio = (i + 1) / (numPoints + 1);
            line.push({
                x: startPointRef.current.x + ratio * distanceX - 20,
                y: startPointRef.current.y + ratio * distanceY,
            });
        }
        setLines((prevLines) => [...prevLines.slice(0, -1), line]);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleClickPoint = (pointIndex) => {
        const newClickedPoints = new Set(clickedPoints);
        if (newClickedPoints.has(pointIndex)) {
            newClickedPoints.delete(pointIndex);
        } else {
            newClickedPoints.add(pointIndex); 
        }
        setClickedPoints(newClickedPoints);
    };
    return (
        <div>
            <h2>Draw your seats</h2>
            <button onClick={() => {
                setIsDrawing(true);
                setSeat(true);
            }}>Select</button>
            <button onClick={() => {
                setIsDrawing(false);
                setSeat(false);

            }}>Seats</button>
            <div
                ref={drawingAreaRef}
                className="drawing-area"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {lines.map((line, lineIndex) => {
                    return <div key={lineIndex}>
                        {line.map((point, pointIndex) => (
                            <div
                                key={pointIndex}
                                className={`seat ${clickedPoints.has(pointIndex) ? 'clicked' : ''}`}
                                style={{ left: point.x, top: point.y }}
                                onClick={() => handleClickPoint(pointIndex)}
                            >
                            </div>
                        ))}
                    </div>
                })}
            </div>
        </div>
    );
};

export default SeatDrawing;
