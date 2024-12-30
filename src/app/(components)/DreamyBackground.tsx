import React, { useState, useEffect } from 'react';

const generateRandomPoints = (count: number) =>
  Array.from({ length: count }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

const calculateDistances = (points: { top: number; left: number }[]) => {
  const connections = [];
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
  const [points, setPoints] = useState<{ top: number; left: number }[]>([]);
  const [connections, setConnections] = useState<
    { start: { top: number; left: number }; end: { top: number; left: number } }[]
  >([]);

  useEffect(() => {
    const generatedPoints = generateRandomPoints(100); // Incrementar número de puntos
    setPoints(generatedPoints);

    // Calcular conexiones
    const generatedConnections = calculateDistances(generatedPoints);
    setConnections(generatedConnections);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1] bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
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
            stroke="white"
            strokeWidth="0.33"
            strokeOpacity="0.55"
            className="animate-constellation"
          />
        ))}
      </svg>

      {/* Formas entre puntos cercanos */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, index) => {
          const midX = (connection.start.left + connection.end.left) / 2;
          const midY = (connection.start.top + connection.end.top) / 2;
          return (
            <polygon
              key={`polygon-${index}`}
              points={`${connection.start.left},${connection.start.top} ${connection.end.left},${connection.end.top} ${midX},${midY}`}
              fill="rgba(255, 255, 255, 0.05)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.33"
            strokeOpacity="0.55"
            className="animate-constellation"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default DreamyBackground;
