// import React, { useRef, useEffect, useState } from 'react';

// const MovableSquare = () => {
//   const canvasRef = useRef(null);
//   const [position, setPosition] = useState({ x: 50, y: 50 });
//   const [isDragging, setDragging] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     // Set the size of the canvas
//     canvas.width = 400;
//     canvas.height = 400;

//     const drawSquare = () => {
//       // Clear the canvas
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw a filled square
//       context.fillStyle = 'blue';
//       context.fillRect(position.x, position.y, 100, 100);

//       // Add a border to the square
//       context.strokeStyle = 'black';
//       context.lineWidth = 2;
//       context.strokeRect(position.x, position.y, 100, 100);
//     };

//     drawSquare();
//   }, [position]);

//   const handleMouseDown = (e) => {
//     const mouseX = e.nativeEvent.offsetX;
//     const mouseY = e.nativeEvent.offsetY;

//     if (
//       mouseX >= position.x &&
//       mouseX <= position.x + 100 &&
//       mouseY >= position.y &&
//       mouseY <= position.y + 100
//     ) {
//       setDragging(true);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const newX = e.nativeEvent.offsetX - 50; // Adjust for the square's width
//       const newY = e.nativeEvent.offsetY - 50; // Adjust for the square's height
//       setPosition({ x: newX, y: newY });
//     }
//   };

//   const handleMouseUp = () => {
//     setDragging(false);
//   };

//   return (
//     <canvas
//       ref={canvasRef}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
//     />
//   );
// };

// export default MovableSquare;
