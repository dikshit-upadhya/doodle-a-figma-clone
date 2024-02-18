import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const pointerEnum = {
  default: "default",
  pointer: "pointer",
  crosshair: "crosshair",
  move: "move",
  text: "text",
};

const controlPoints = {
  TOP_LEFT: "TOP_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
};

let styles = {};
let makeStyleForCursor = (cursorValue) => {
  return {
    cursor: cursorValue,
  };
};
Object.keys(pointerEnum).forEach((i, index) => {
  styles[i] = makeStyleForCursor(pointerEnum[i]);
});

function App() {
  const [clicked, setClicked] = useState(false);
  const [squares, setSquares] = useState([]);
  const [activeSquare, setActiveSquare] = useState([]);
  const [currentlyHoveredSquare, setCurrentlyHoveredSquare] = useState({
    id: "",
    offsetX: 0,
    offsetY: 0,
  });
  const [cursor, setCursor] = useState(pointerEnum.default);

  const canvasRef = useRef();
  const canvasContext = useRef(null);

  const resetCanvas = () => {
    canvasContext.current.fillStyle = "skyblue";
    canvasContext.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasContext.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    canvasContext.current = context;
    canvasRef.current.width = window.innerWidth - 10;
    canvasRef.current.height = window.innerHeight - 10;
    setSquares([
      {
        id: uuid(),
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        controlPoints: [
          { x: 50, y: 50, type: controlPoints.TOP_LEFT },
          { x: 50, y: 150, type: controlPoints.TOP_RIGHT },
          { x: 150, y: 50, type: controlPoints.BOTTOM_LEFT },
          { x: 150, y: 150, type: controlPoints.BOTTOM_RIGHT },
        ],
        background: "red",
      },
    ]);
    resetCanvas();
  }, []);

  const clickedController = (e) => {
    const [mouseX, mouseY] = getAdjustedCoordinates(e);
    if (currentlyHoveredSquare.id) {
      let curSquare = squares.find((i) => i.id === currentlyHoveredSquare.id);
      setCurrentlyHoveredSquare({
        id: curSquare.id,
        offsetX: Math.abs(curSquare.x - mouseX),
        offsetY: Math.abs(curSquare.y - mouseY),
      });
    }
    const context = canvasContext.current;
    setClicked(true);
    let currentSquareId = uuid();
    squares.forEach((squareElement) => {
      context.fillStyle = squareElement.background;
      context.fillRect(squareElement.x, squareElement.y, squareElement.width, squareElement.height);
    });

    setSquares((prev) => [
      ...prev.map(i => ({...i, controlPoints2: i.controlPoints})),
      { id: currentSquareId, x: mouseX, y: mouseY, width: 0, height: 0, background: "blue" },
    ]);
    setActiveSquare({ id: currentSquareId });
  };

  const unclickedController = (e) => {
    // this function is so that when mouse clicks and draws square in opposite x direction or the opposite y direction. This function redefines the x and y coordinates of the square
    // debugger;
    setSquares((prev) => {
      let reqdArr = prev
        .filter((i) => {
          return i.width !== 0 || i.height !== 0;
        })
        .map((squareItem) => {
          if (squareItem.width < 0) {
            let curWidth = squareItem.width;
            let curX = squareItem.x;
            squareItem.x = curX + curWidth;
            squareItem.width = Math.abs(squareItem.width);
          }
          if (squareItem.height < 0) {
            let curHeight = squareItem.height;
            let curY = squareItem.y;
            squareItem.y = curY + curHeight;
            squareItem.height = Math.abs(squareItem.height);
          }
          return { ...squareItem, controlPoints: squareItem.controlPoints2, controlPoints2: squareItem.controlPoints2 };
        });
      return reqdArr;
    });
    setClicked(false);
    setActiveSquare({ id: null, offsetX: 10, offsetY: 10 });
  };

  useEffect(() => {
    console.log(squares)
    let context = canvasContext.current;
    resetCanvas();
    squares.forEach((squareItem) => {
      context.fillStyle = squareItem.background;
      context.fillRect(squareItem.x, squareItem.y, squareItem.width, squareItem.height);
      context.strokeStyle = "black";
      context.strokeRect(squareItem.x, squareItem.y, squareItem.width, squareItem.height);
      context.strokeStyle = "blue";
      context.fillStyle = "white";
      squareItem.controlPoints?.forEach((point) => {
        context.beginPath()
        context.moveTo(point.x, point.y);
        context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
        context.closePath()
      });
    });
  }, [squares]);

  const getAdjustedCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    // Calculate mouse coordinates relative to the canvas
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return [mouseX, mouseY];
  }

  const moveHandler = (e) => {
    const [mouseX, mouseY] = getAdjustedCoordinates(e);
    if (clicked) {
      if (!!currentlyHoveredSquare.id) {
        setSquares((prev) => {
          return prev.map((i) => {
            if (i.id === currentlyHoveredSquare.id) {
              return {
                id: i.id,
                x: mouseX - currentlyHoveredSquare.offsetX,
                y: mouseY - currentlyHoveredSquare.offsetY,
                controlPoints2: [
                  {
                    x: mouseX - currentlyHoveredSquare.offsetX,
                    y: mouseY - currentlyHoveredSquare.offsetY,
                    type: controlPoints.TOP_LEFT,
                  },
                  {
                    x: mouseX - currentlyHoveredSquare.offsetX + i.width,
                    y: mouseY - currentlyHoveredSquare.offsetY,
                    type: controlPoints.TOP_RIGHT,
                  },
                  {
                    x: mouseX - currentlyHoveredSquare.offsetX,
                    y: mouseY - currentlyHoveredSquare.offsetY + i.height,
                    type: controlPoints.BOTTOM_LEFT,
                  },
                  {
                    x: mouseX - currentlyHoveredSquare.offsetX + i.width,
                    y: mouseY - currentlyHoveredSquare.offsetY + i.height,
                    type: controlPoints.BOTTOM_RIGHT,
                  },
                ],
                controlPoints: [],
                width: i.width,
                height: i.height,
                background: i.background,
              };
            }
            // return { ...i, controlPoints2: i.controlPoints, controlPoints: [] };
            return { ...i, controlPoints2: i.controlPoints, controlPoints: [] };
          });
        });
      } else {
        draw(e);
      }
    } else {
      let isHovered = false;
      let currentHoveredSquare = "";

      squares.forEach((squareElement) => {
        if (!isHovered) {
          if (
            mouseX >= squareElement.x &&
            mouseX <= squareElement.x + squareElement.width &&
            mouseY >= squareElement.y &&
            mouseY <= squareElement.y + squareElement.height
          ) {
            isHovered = true;
            currentHoveredSquare = squareElement.id;
          } else {
            isHovered = false;
            currentHoveredSquare = "";
          }
        }
      });
      if (currentlyHoveredSquare.id !== currentHoveredSquare) {
        setCurrentlyHoveredSquare({
          id: currentHoveredSquare,
          offsetX: currentlyHoveredSquare.offsetX,
          offsetY: currentlyHoveredSquare.offsetY,
        });
      }
      if (isHovered) {
        setCursor(pointerEnum.move);
      } else {
        setCursor(pointerEnum.default);
      }
    }
  };

  const draw = (e) => {
    const [mouseX, mouseY] = getAdjustedCoordinates(e);
    // find the square that you are currently drawing.
    let currentSquare = squares.find((i) => i.id === activeSquare.id);
    setSquares((prev) => [
      ...prev.map((i) => {
        if (i.id === currentSquare.id) {
          return {
            id: currentSquare.id,
            x: currentSquare.x,
            y: currentSquare.y,
            width: mouseX - currentSquare.x,
            height: mouseY - currentSquare.y,
            background: "blue",
          };
        }
        return i;
      }),
    ]);
  };

  const scrollHandler = (e) => {};

  return (
    <div className="App" style={{ ...styles[cursor] }}>
      <canvas
        ref={canvasRef}
        onMouseDown={clickedController}
        onMouseUp={unclickedController}
        onMouseMove={moveHandler}
        onScroll={scrollHandler}
      />
      <button onClick={() => console.log(squares)}>click</button>
    </div>
  );
}

export default App;
