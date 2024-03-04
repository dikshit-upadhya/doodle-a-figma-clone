import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

const pointerEnum = {
	default: 'default',
	pointer: 'pointer',
	crosshair: 'crosshair',
	move: 'move',
	text: 'text',
};

const controlPoints = {
	TOP_LEFT: 'TOP_LEFT',
	TOP_RIGHT: 'TOP_RIGHT',
	BOTTOM_LEFT: 'BOTTOM_LEFT',
	BOTTOM_RIGHT: 'BOTTOM_RIGHT',
};

const styles = {};
const makeStyleForCursor = (cursorValue) => ({
	cursor: cursorValue,
});
Object.keys(pointerEnum).forEach((i) => {
	styles[i] = makeStyleForCursor(pointerEnum[i]);
});

function App() {
	const [clicked, setClicked] = useState(false);
	const [squares, setSquares] = useState([]);
	const [activeSquare, setActiveSquare] = useState([]);
	const [currentlyHoveredSquare, setCurrentlyHoveredSquare] = useState({
		id: '',
		offsetX: 0,
		offsetY: 0,
	});
	const [currentlyHoveredCP, setCurrentlyHoveredCP] = useState({
		id: '',
		type: '',
	});
	const [cursor, setCursor] = useState(pointerEnum.default);
	const [canvasTransform, setCanvasTransform] = useState({
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: 0,
		f: 0,
	});

	const canvasRef = useRef();
	const canvasContext = useRef(null);

	const resetCanvas = () => {
		canvasContext.current.fillStyle = 'skyblue';
		canvasContext.current.fillRect(
			-canvasTransform.e,
			-canvasTransform.f,
			canvasRef.current.width + Math.abs(canvasTransform.e),
			canvasRef.current.height + Math.abs(canvasTransform.f)
		);
	};

	useEffect(() => {
		const context = canvasRef.current.getContext('2d');
		context.setTransform(canvasTransform);
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
					{ x: 150, y: 50, type: controlPoints.TOP_RIGHT },
					{ x: 50, y: 150, type: controlPoints.BOTTOM_LEFT },
					{ x: 150, y: 150, type: controlPoints.BOTTOM_RIGHT },
				],
				controlPoints2: [
					{ x: 50, y: 50, type: controlPoints.TOP_LEFT },
					{ x: 50, y: 150, type: controlPoints.TOP_RIGHT },
					{ x: 150, y: 50, type: controlPoints.BOTTOM_LEFT },
					{ x: 150, y: 150, type: controlPoints.BOTTOM_RIGHT },
				],
				background: 'red',
			},
		]);
		resetCanvas();
	}, []);

	const redrawEverything = () => {
		const context = canvasContext.current;
		resetCanvas();
		squares.forEach((squareItem) => {
			context.fillStyle = squareItem.background;
			context.fillRect(
				squareItem.x,
				squareItem.y,
				squareItem.width,
				squareItem.height
			);
			context.strokeStyle = 'black';
			context.strokeRect(
				squareItem.x,
				squareItem.y,
				squareItem.width,
				squareItem.height
			);
			context.strokeStyle = 'blue';
			context.fillStyle = 'white';
			squareItem.controlPoints?.forEach((point) => {
				context.beginPath();
				context.moveTo(point.x, point.y);
				context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
				context.stroke();
				context.fill();
				context.closePath();
			});
		});
	};

	useEffect(() => {
		const { a } = canvasTransform;
		const { b } = canvasTransform;
		const { c } = canvasTransform;
		const { d } = canvasTransform;
		const { e } = canvasTransform;
		const { f } = canvasTransform;
		canvasContext.current.setTransform(a, b, c, d, e, f);
		redrawEverything();
	}, [canvasTransform]);

	const getAdjustedCoordinates = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();

		// Calculate mouse coordinates relative to the canvas
		const mouseX = e.clientX - rect.left - canvasTransform.e;
		const mouseY = e.clientY - rect.top - canvasTransform.f;
		return [mouseX, mouseY];
	};

	const clickedController = (e) => {
		const [mouseX, mouseY] = getAdjustedCoordinates(e);
		setClicked(true);
		if (currentlyHoveredSquare.id) {
			const curSquare = squares.find((i) => i.id === currentlyHoveredSquare.id);
			setCurrentlyHoveredSquare({
				id: curSquare.id,
				offsetX: Math.abs(curSquare.x - mouseX),
				offsetY: Math.abs(curSquare.y - mouseY),
			});
		} else {
			const currentSquareId = uuid();
			setSquares((prev) => [
				...prev.map((i) => ({ ...i, controlPoints2: i.controlPoints })),
				{
					id: currentSquareId,
					x: mouseX,
					y: mouseY,
					width: 0,
					height: 0,
					background: 'blue',
				},
			]);
			setActiveSquare({ id: currentSquareId });
		}
	};

	const unclickedController = () => {
		// this function is so that when mouse clicks and draws square in opposite x direction or the opposite y direction. This function redefines the x and y coordinates of the square
		setSquares((prev) => {
			const reqdArr = prev
				.filter((i) => i.width !== 0 || i.height !== 0)
				.map((item) => {
					const squareItem = item;
					if (squareItem.width < 0) {
						const curWidth = squareItem.width;
						const curX = squareItem.x;
						squareItem.x = curX + curWidth;
						squareItem.width = Math.abs(squareItem.width);
					}
					if (squareItem.height < 0) {
						const curHeight = squareItem.height;
						const curY = squareItem.y;
						squareItem.y = curY + curHeight;
						squareItem.height = Math.abs(squareItem.height);
					}
					if (!squareItem.controlPoints2) {
						squareItem.controlPoints2 = [
							{
								x: squareItem.x,
								y: squareItem.y,
								type: controlPoints.TOP_LEFT,
							},
							{
								x: squareItem.x + squareItem.width,
								y: squareItem.y,
								type: controlPoints.TOP_RIGHT,
							},
							{
								x: squareItem.x,
								y: squareItem.y + squareItem.height,
								type: controlPoints.BOTTOM_LEFT,
							},
							{
								x: squareItem.x + squareItem.width,
								y: squareItem.y + squareItem.height,
								type: controlPoints.BOTTOM_RIGHT,
							},
						];
					}
					return {
						...squareItem,
						controlPoints: squareItem.controlPoints2,
						controlPoints2: squareItem.controlPoints2,
					};
				});
			return reqdArr;
		});
		setClicked(false);
		setActiveSquare({ id: null, offsetX: 10, offsetY: 10 });
	};

	useEffect(() => {
		redrawEverything();
	}, [squares]);

	const draw = (e) => {
		const [mouseX, mouseY] = getAdjustedCoordinates(e);
		// find the square that you are currently drawing.
		const currentSquare = squares.find((i) => i.id === activeSquare.id);
		setSquares((prev) => [
			...prev.map((i) => {
				if (i.id === currentSquare.id) {
					return {
						id: currentSquare.id,
						x: currentSquare.x,
						y: currentSquare.y,
						width: mouseX - currentSquare.x,
						height: mouseY - currentSquare.y,
						background: 'blue',
					};
				}
				return i;
			}),
		]);
	};

	const moveHandler = (e) => {
		const [mouseX, mouseY] = getAdjustedCoordinates(e);
		if (clicked) {
			if (currentlyHoveredCP.id) {
				setSquares((prev) =>
					prev.map((i) => {
						if (i.id === currentlyHoveredCP.id) {
							// if(currentlyHoveredCP.type === controlPoints.TOP_LEFT) {

							// }
							switch (currentlyHoveredCP.type) {
								case controlPoints.TOP_LEFT:
									return {
										id: i.id,
										x: mouseX,
										y: mouseY,
										controlPoints: [],
										width: i.x + i.width - mouseX,
										height: i.y + i.height - mouseY,
										background: i.background,
									};
								case controlPoints.TOP_RIGHT:
									return {
										id: i.id,
										x: i.x,
										y: mouseY,
										controlPoints: [],
										width: mouseX - i.x,
										height: i.y + i.height - mouseY,
										background: i.background,
									};
								case controlPoints.BOTTOM_LEFT:
									return {
										id: i.id,
										x: mouseX,
										y: i.y,
										controlPoints: [],
										width: i.width + i.x - mouseX,
										height: mouseY - i.y,
										background: i.background,
									};
								case controlPoints.BOTTOM_RIGHT:
									return {
										id: i.id,
										x: i.x,
										y: i.y,
										controlPoints: [],
										width: mouseX - i.x,
										height: mouseY - i.y,
										background: i.background,
									};
								default:
									break;
							}

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
						return { ...i };
					})
				);
			} else if (currentlyHoveredSquare.id) {
				setSquares((prev) =>
					prev.map((i) => {
						if (i.id === currentlyHoveredSquare.id) {
							return {
								id: i.id,
								x: mouseX - currentlyHoveredSquare.offsetX,
								y: mouseY - currentlyHoveredSquare.offsetY,
								controlPoints: [],
								width: i.width,
								height: i.height,
								background: i.background,
							};
						}
						// return { ...i, controlPoints2: i.controlPoints, controlPoints: [] };
						return { ...i };
					})
				);
			} else {
				draw(e);
			}
		} else {
			let isCPHovered = false;
			let currentHoveredCP = '';
			let isHovered = false;
			let currentHoveredSquare = '';

			squares.forEach((squareElement) => {
				if (!isCPHovered) {
					squareElement.controlPoints.forEach((cpElement) => {
						const dist = Math.sqrt(
							(cpElement.x - mouseX) * (cpElement.x - mouseX) +
								(cpElement.y - mouseY) * (cpElement.y - mouseY)
						);
						if (dist <= 8) {
							isCPHovered = true;
							isHovered = true;
							currentHoveredCP = cpElement.type;
							currentHoveredSquare = squareElement.id;
						}
					});
				}
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
						currentHoveredSquare = '';
					}
				}
			});
			if (isCPHovered) {
				setCurrentlyHoveredCP({
					id: currentHoveredSquare,
					type: currentHoveredCP,
				});
			} else {
				setCurrentlyHoveredCP({
					id: null,
					type: null,
				});
			}
			if (currentlyHoveredSquare.id !== currentHoveredSquare) {
				setCurrentlyHoveredSquare({
					id: currentHoveredSquare,
					offsetX: currentlyHoveredSquare.offsetX,
					offsetY: currentlyHoveredSquare.offsetY,
				});
			} else if (!isHovered) {
				setCurrentlyHoveredSquare({
					id: null,
					offsetX: 0,
					offsetY: 0,
				});
			}
			if (!isCPHovered) {
				if (isHovered) {
					setCursor(pointerEnum.move);
				} else {
					setCursor(pointerEnum.default);
				}
			}
		}
	};

	function detectMouseWheelDirection(e) {
		return e.deltaY > 0 ? 'down' : 'up';
	}

	const scrollHandler = (e) => {
		const direction = detectMouseWheelDirection(e);
		if (!e.shiftKey) {
			if (direction === 'down') {
				setCanvasTransform((prev) => ({
					a: prev.a,
					b: prev.b,
					c: prev.c,
					d: prev.d,
					e: prev.e,
					f: prev.f - 5,
				}));
			} else {
				setCanvasTransform((prev) => ({
					a: prev.a,
					b: prev.b,
					c: prev.c,
					d: prev.d,
					e: prev.e,
					f: prev.f + 5,
				}));
			}
		} else if (direction === 'down') {
			setCanvasTransform((prev) => ({
				a: prev.a,
				b: prev.b,
				c: prev.c,
				d: prev.d,
				e: prev.e - 5,
				f: prev.f,
			}));
		} else {
			setCanvasTransform((prev) => ({
				a: prev.a,
				b: prev.b,
				c: prev.c,
				d: prev.d,
				e: prev.e + 5,
				f: prev.f,
			}));
		}
		redrawEverything();
		// }
	};

	return (
		<div className="App" style={{ ...styles[cursor] }}>
			<canvas
				ref={canvasRef}
				onMouseDown={clickedController}
				onMouseUp={unclickedController}
				onMouseMove={moveHandler}
				// onScroll={scrollHandler}
				onWheel={scrollHandler}
			/>
		</div>
	);
}

export default App;
