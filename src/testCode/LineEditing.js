// import React, { useRef, useEffect, useState } from 'react';

// const EditableLineCanvas = () => {
//   const canvasRef = useRef(null);
//   const [points, setPoints] = useState([{ x: 50, y: 50 }, { x: 150, y: 150 }]);
//   const [selectedPointIndex, setSelectedPointIndex] = useState(null);
//   const isDrawing = useRef(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // Set line properties
//     ctx.lineWidth = 5;
//     ctx.lineJoin = 'round';
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'blue';

//     const drawLine = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.beginPath();
//       ctx.moveTo(points[0].x, points[0].y);
//       points.forEach((point) => ctx.lineTo(point.x, point.y));
//       ctx.stroke();
//     };

//     const drawControlPoints = () => {
//       points.forEach((point, index) => {
//         ctx.fillStyle = index === selectedPointIndex ? 'red' : 'green';
//         ctx.beginPath();
//         ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
//         ctx.fill();
//       });
//     };

//     const handleMouseDown = (event) => {
//       const mouseX = event.clientX - canvas.offsetLeft;
//       const mouseY = event.clientY - canvas.offsetTop;

//       points.forEach((point, index) => {
//         const distance = Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2);
//         if (distance < 6) {
//           setSelectedPointIndex(index);
//         }
//       });

//       isDrawing.current = true;
//     };

//     const handleMouseMove = (event) => {
//       if (!isDrawing.current || selectedPointIndex === null) return;

//       const mouseX = event.clientX - canvas.offsetLeft;
//       const mouseY = event.clientY - canvas.offsetTop;

//       points[selectedPointIndex] = { x: mouseX, y: mouseY };

//       drawLine();
//       drawControlPoints();
//     };

//     const handleMouseUp = () => {
//       isDrawing.current = false;
//       setSelectedPointIndex(null);
//     };

//     canvas.addEventListener('mousedown', handleMouseDown);
//     canvas.addEventListener('mousemove', handleMouseMove);
//     canvas.addEventListener('mouseup', handleMouseUp);

//     drawLine();
//     drawControlPoints();

//     return () => {
//       canvas.removeEventListener('mousedown', handleMouseDown);
//       canvas.removeEventListener('mousemove', handleMouseMove);
//       canvas.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [points, selectedPointIndex]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={400}
//       height={200}
//       style={{ border: '1px solid #000' }}
//     ></canvas>
//   );
// };

// export default EditableLineCanvas;
