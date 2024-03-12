import React, { useRef, useEffect } from 'react';

function PenTool() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawing = useRef(false);
  const points = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    isDrawing.current = true;
    points.current = [{ x: offsetX, y: offsetY }];
  };

  const continueDrawing = ({ nativeEvent }) => {
    if (!isDrawing.current) return;

    const { offsetX, offsetY } = nativeEvent;
    points.current = [...points.current, { x: offsetX, y: offsetY }];

    drawCurve();
  };

  const endDrawing = () => {
    isDrawing.current = false;
    points.current = [];
  };

  const drawCurve = () => {
    const context = contextRef.current;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    if (points.current.length < 3) return;

    context.beginPath();
    context.moveTo(points.current[0].x, points.current[0].y);

    for (let i = 1; i < points.current.length - 2; i++) {
      const xc = (points.current[i].x + points.current[i + 1].x) / 2;
      const yc = (points.current[i].y + points.current[i + 1].y) / 2;
      context.quadraticCurveTo(points.current[i].x, points.current[i].y, xc, yc);
    }

    // For the last 2 points
    context.quadraticCurveTo(
      points.current[points.current.length - 2].x,
      points.current[points.current.length - 2].y,
      points.current[points.current.length - 1].x,
      points.current[points.current.length - 1].y
    );

    context.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={continueDrawing}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
    />
  );
}

export default PenTool;
