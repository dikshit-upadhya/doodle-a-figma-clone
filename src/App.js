import { useEffect, useRef, useState } from "react";

function App() {
  const [clicked, setClicked] = useState(false)

  const canvasRef = useRef()
  const canvasContext = useRef(null)

  useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    canvasContext.current = context
    canvasRef.current.width = window.innerWidth - 10
    canvasRef.current.height = window.innerHeight - 10
    context.fillStyle = 'skyblue'
    context.fillRect(0,0, canvasRef.current.width, canvasRef.current.height)
  }, [])

  const clickedController = (e) => {
    const context = canvasRef.current.getContext('2d')
    setClicked(true)
    context.beginPath()
  }

  const unclickedController = (e) => {
    setClicked(false)
  }

  const draw = (e) => {
    if(!clicked) {
      return
    }
    const context = canvasRef.current.getContext('2d')
    const x = e.clientX
    const y = e.clientY
    
    context.lineWidth = 10
    context.strokeStyle = '#ff0000'
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineTo(x, y)
    context.stroke()
  }

  const scrollHandler = (e) => {

  }

  return (
    <div className="App">
      <canvas ref={canvasRef}  onMouseDown={clickedController} onMouseUp={unclickedController} onMouseMove={draw} onScroll={scrollHandler} />
    </div>
  );
}

export default App;
