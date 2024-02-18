import React, { useState, useRef, useEffect } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [squares, setSquares] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [resizeStartX, setResizeStartX] = useState(null);
  const [resizeStartY, setResizeStartY] = useState(null);
  const [resizingControlPointIndex, setResizingControlPointIndex] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      squares.forEach((square, index) => {
        ctx.beginPath();
        ctx.rect(square.x, square.y, square.width, square.height);
        ctx.stroke();
        drawControlPoints(ctx, square);
      });
    };

    draw();
  }, [squares]);

  const drawControlPoints = (ctx, square) => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(square.x - 3, square.y - 3, 6, 6); // Top-left
    ctx.fillRect(square.x + square.width - 3, square.y - 3, 6, 6); // Top-right
    ctx.fillRect(square.x - 3, square.y + square.height - 3, 6, 6); // Bottom-left
    ctx.fillRect(square.x + square.width - 3, square.y + square.height - 3, 6, 6); // Bottom-right
  };

  const handleMouseDown = (e) => {
    const mouseX = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = e.clientY - canvasRef.current.getBoundingClientRect().top;

    const clickedSquareIndex = squares.findIndex(square =>
      mouseX >= square.x && mouseX <= square.x + square.width &&
      mouseY >= square.y && mouseY <= square.y + square.height
    );

    if (clickedSquareIndex !== -1) {
      const square = squares[clickedSquareIndex];
      const resizeAreaSize = 6; // Control point size

      if (mouseX >= square.x && mouseX <= square.x + resizeAreaSize &&
          mouseY >= square.y && mouseY <= square.y + resizeAreaSize) {
        setResizingControlPointIndex(clickedSquareIndex); // Top-left corner
        setResizeStartX(square.x + square.width);
        setResizeStartY(square.y + square.height);
      } else if (mouseX >= square.x + square.width - resizeAreaSize && mouseX <= square.x + square.width &&
                 mouseY >= square.y && mouseY <= square.y + resizeAreaSize) {
        setResizingControlPointIndex(clickedSquareIndex + 1); // Top-right corner
        setResizeStartX(square.x);
        setResizeStartY(square.y + square.height);
      } else if (mouseX >= square.x && mouseX <= square.x + resizeAreaSize &&
                 mouseY >= square.y + square.height - resizeAreaSize && mouseY <= square.y + square.height) {
        setResizingControlPointIndex(clickedSquareIndex + 2); // Bottom-left corner
        setResizeStartX(square.x + square.width);
        setResizeStartY(square.y);
      } else if (mouseX >= square.x + square.width - resizeAreaSize && mouseX <= square.x + square.width &&
                 mouseY >= square.y + square.height - resizeAreaSize && mouseY <= square.y + square.height) {
        setResizingControlPointIndex(clickedSquareIndex + 3); // Bottom-right corner
        setResizeStartX(square.x);
        setResizeStartY(square.y);
      } else {
        setDragging(true);
        setSelectedSquareIndex(clickedSquareIndex);
      }
    } else {
      setIsDrawing(true);
      setSquares(prevSquares => [...prevSquares, { x: mouseX, y: mouseY, width: 0, height: 0 }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing && !dragging && resizingControlPointIndex === null) return;

    const mouseX = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const mouseY = e.clientY - canvasRef.current.getBoundingClientRect().top;

    if (isDrawing) {
      const updatedSquares = squares.slice(0, squares.length - 1);
      const square = squares[squares.length - 1];
      const width = mouseX - square.x;
      const height = mouseY - square.y;
      updatedSquares.push({ x: square.x, y: square.y, width, height });
      setSquares(updatedSquares);
    } else if (dragging) {
      const updatedSquares = squares.map((square, index) => {
        if (index === selectedSquareIndex) {
          return { ...square, x: mouseX, y: mouseY };
        }
        return square;
      });
      setSquares(updatedSquares);
    } else if (resizingControlPointIndex !== null) {
      const squareIndex = Math.floor(resizingControlPointIndex / 4);
      const controlPointIndex = resizingControlPointIndex % 4;
      const updatedSquares = squares.map((square, index) => {
        if (index === squareIndex) {
          let width = square.width;
          let height = square.height;

          if (controlPointIndex === 0 || controlPointIndex === 2) {
            width = resizeStartX - mouseX;
            height = resizeStartY - mouseY;
          } else {
            width = mouseX - resizeStartX;
            height = mouseY - resizeStartY;
          }

          let x = square.x;
          let y = square.y;

          if (controlPointIndex === 0 || controlPointIndex === 1) {
            x = mouseX;
          }
          if (controlPointIndex === 0 || controlPointIndex === 2) {
            y = mouseY;
          }

          return { ...square, x, y, width, height };
        }
        return square;
      });
      setSquares(updatedSquares);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setDragging(false);
    setResizingControlPointIndex(null);
    setSelectedSquareIndex(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid black' }}
    />
  );
};

export default DrawingCanvas;
