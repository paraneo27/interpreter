"use client";

import { useEffect, useState } from "react";

interface Point {
  top: number;
  left: number;
}

interface Connection {
  start: Point;
  end: Point;
}

const generateRandomPoints = (count: number): Point[] =>
  Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

const calculateDistances = (points: Point[]): Connection[] => {
  const connections: Connection[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].left - points[j].left;
      const dy = points[i].top - points[j].top;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Conectar solo si la distancia es menor a un umbral
      if (distance < 15) {
        connections.push({ start: points[i], end: points[j] });
      }
    }
  }
  return connections;
};

const DreamyBackground = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const generatedPoints = generateRandomPoints(100);
    setPoints(generatedPoints);

    const generatedConnections = calculateDistances(generatedPoints);
    setConnections(generatedConnections);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Puntos flotantes */}
      {points.map((point, index) => (
        <span
          key={`point-${index}`}
          className="absolute rounded-full bg-white opacity-30 w-[4px] h-[4px] animate-dreamy"
          style={{
            top: `${point.top}%`,
            left: `${point.left}%`,
          }}
        ></span>
      ))}

      {/* Líneas entre puntos cercanos */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, index) => (
          <line
            key={`line-${index}`}
            x1={`${connection.start.left}%`}
            y1={`${connection.start.top}%`}
            x2={`${connection.end.left}%`}
            y2={`${connection.end.top}%`}
            stroke="yellow"
            strokeWidth="0.33"
            strokeOpacity="0.55"
            className="animate-constellation"
          />
        ))}
      </svg>
    </div>
  );
};

export default DreamyBackground;
