import React from 'react';
import "tailwindcss/tailwind.css";

const LoadingConstellation: React.FC = () => {
  const points = [
    { x: 55, y: 11 },
    { x: 63, y: 71 },
    { x: 65, y: 22 },
    { x: 22, y: 55 },
    { x: 17, y: 33 },
    { x: 11, y: 99 },
  ];

  return (
    <svg className="w-24 h-24" viewBox="0 0 100 100">
      {/* Líneas conectando los puntos */}
      <g className="lines">
        {points.map((point, index) => (
          <line
            key={index}
            x1={point.x}
            y1={point.y}
            x2={points[(index + 1) % points.length].x}
            y2={points[(index + 1) % points.length].y}
            stroke="white"
            strokeWidth="1"
            className="animate-line"
          />
        ))}
      </g>
      {/* Puntos */}
      <g className="points">
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="white"
            className="animate-pulse"
          />
        ))}
      </g>
    </svg>
  );
};

export default LoadingConstellation;
