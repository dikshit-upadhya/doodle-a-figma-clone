// import { useEffect, useRef, useState } from "react";
// import { v4 as uuid } from "uuid";

// function App() {
//   const [clicked, setClicked] = useState(false);
//   const [lines, setLines] = useState([]);
//   const [activeLine, setActiveLine] = useState();

//   const canvasRef = useRef();
//   const canvasContext = useRef(null);

//   useEffect(() => {
//     const context = canvasRef.current.getContext("2d");
//     canvasContext.current = context;
//     canvasRef.current.width = window.innerWidth - 10;
//     canvasRef.current.height = window.innerHeight - 10;
//     context.fillStyle = "skyblue";
//     context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   }, []);

//   const resetCanvas = () => {
//     canvasContext.current.fillStyle = "skyblue";
//     canvasContext.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   }

//   const clickedController = (e) => {
//     const context = canvasRef.current.getContext("2d");
//     setClicked(true);
//     // context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     context.beginPath();
//     let currentLineId = uuid();
//     lines.forEach((lineElement) => {
//       const context = canvasRef.current.getContext("2d");
//       context.lineWidth = 10;
//       context.strokeStyle = "#ff0000";
//       context.lineJoin = "round";
//       context.lineCap = "round";
//       context.beginPath();
//       context.moveTo(lineElement.start.x, lineElement.start.y);
//       context.lineTo(lineElement.end.x, lineElement.end.y);
//       context.stroke();
//     });
//     setLines((prev) => [
//       ...prev,
//       { id: currentLineId, start: { x: e.clientX, y: e.clientY }, end: {} },
//     ]);
//     setActiveLine(currentLineId);
//   };

//   const unclickedController = (e) => {
//     setClicked(false);
//   };

//   const draw = (e) => {
//     if (!clicked) {
//       return;
//     }
//     const context = canvasRef.current.getContext("2d");
//     const curx = e.clientX;
//     const cury = e.clientY;
//     context.lineWidth = 10;
//     context.strokeStyle = "#ff0000";
//     context.lineJoin = "round";
//     context.lineCap = "round";
//     // context.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
//     resetCanvas()
//     lines.forEach((lineElement) => {
//       const context = canvasRef.current.getContext("2d");
//       context.lineWidth = 10;
//       context.strokeStyle = "#ff0000";
//       context.lineJoin = "round";
//       context.lineCap = "round";
//       context.beginPath();
//       context.moveTo(lineElement.start.x, lineElement.start.y);
//       context.lineTo(lineElement.end.x, lineElement.end.y);
//       context.stroke();
//     });
//     // find the line that you are currently drawing.
//     let currentLine = lines.find((i) => i.id === activeLine);
//     setLines((prev) => [
//       ...prev.map((i) => {
//         if (i.id === currentLine.id) {
//           return {
//             id: currentLine.id,
//             start: currentLine.start,
//             end: {
//               x: curx,
//               y: cury,
//             },
//           };
//         }
//         return i;
//       }),
//     ]);
//     context.beginPath();
//     context.moveTo(currentLine.start.x, currentLine.start.y);
//     context.lineTo(curx, cury);
//     context.stroke();
//   };

//   const scrollHandler = (e) => {};

//   return (
//     <div className="App">
//       <canvas
//         ref={canvasRef}
//         onMouseDown={clickedController}
//         onMouseUp={unclickedController}
//         onMouseMove={draw}
//         onScroll={scrollHandler}
//       />
//     </div>
//   );
// }

// export default App;
