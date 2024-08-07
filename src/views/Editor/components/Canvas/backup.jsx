import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { CanvasWrapper } from './styled';
import { openContextMenu } from '../../../../store/reducers/globalContextMenu';
import { getMenuForCanvas } from '../../../../common/globalMenuHandlers';
import {
	resetTransform,
	setSquares as setSquaresRedux,
	translateDown,
	translateLeft,
	translateRight,
	translateUp,
	zoomIn,
	zoomOut,
} from '../../../../store/reducers/canvas';

const pointerEnum = {
	default: 'url(cursor.png), auto',
	pointer: 'pointer',
	crosshair: 'crosshair',
	move: 'url(cursor.png), auto',
	text: 'text',
	brtl: 'url(br-tl.png) 9 9 , auto',
	bltr: 'url(bl-tr.png) 9 9 , auto',
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

function Canvas() {
	const dispatch = useDispatch();
	// redux status
	const { activePage } = useSelector((state) => state.pages);
	const { transform: canvasTransform, squares } = useSelector(
		(state) => state.canvas
	);
	// local states
	const [clicked, setClicked] = useState(false);
	// const [squares, setSquares] = useState([]);

	const [zIndex, setZIndex] = useState(1);
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

	// refs
	const canvasRef = useRef();
	const canvasContext = useRef(null);

	// methods
	const setSquares = (payload) => {
		if (typeof payload === 'function') {
			const newObj = [...squares].map((i) => {
				const obj = { ...i };
				return obj;
			});
			const reqd = payload(newObj);
			dispatch(setSquaresRedux(reqd));
		} else {
			dispatch(setSquaresRedux(payload));
		}
	};

	const resetCanvas = () => {
		const { r, g, b, a } = activePage.pageColor.rgb;
		const currentScale = canvasTransform.a;

		canvasContext.current.clearRect(
			-canvasTransform.e,
			-canvasTransform.f,
			canvasRef.current.width / currentScale,
			canvasRef.current.height / currentScale
		);
		canvasContext.current.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		canvasContext.current.fillRect(
			-canvasTransform.e,
			-canvasTransform.f,
			canvasRef.current.width / currentScale,
			canvasRef.current.height / currentScale
		);
	};

	useEffect(() => {
		const context = canvasRef.current.getContext('2d');
		context.setTransform(canvasTransform);
		canvasContext.current = context;
		canvasRef.current.width = window.innerWidth;
		canvasRef.current.height = window.innerHeight;
		const rect = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		setSquares([
			{
				id: uuid(),
				x: rect.width / 2 - 50,
				y: rect.height / 2 - 50,
				width: 100,
				height: 100,
				controlPoints: [
					{
						x: rect.width / 2 - 50,
						y: rect.height / 2 - 50,
						type: controlPoints.TOP_LEFT,
					},
					{
						x: rect.width / 2 + 50,
						y: rect.height / 2 - 50,
						type: controlPoints.TOP_RIGHT,
					},
					{
						x: rect.width / 2 - 50,
						y: rect.height / 2 + 50,
						type: controlPoints.BOTTOM_LEFT,
					},
					{
						x: rect.width / 2 + 50,
						y: rect.height / 2 + 50,
						type: controlPoints.BOTTOM_RIGHT,
					},
				],
				controlPoints2: [
					{
						x: 679,
						y: 266,
						type: controlPoints.TOP_LEFT,
					},
					{
						x: 779,
						y: 266,
						type: controlPoints.TOP_RIGHT,
					},
					{
						x: 679,
						y: 366,
						type: controlPoints.BOTTOM_LEFT,
					},
					{
						x: 779,
						y: 366,
						type: controlPoints.BOTTOM_RIGHT,
					},
				],
				background: 'red',
				stroke: 'black',
				zIndex,
			},
		]);
		setZIndex((prev) => prev + 1);
		resetCanvas();
		window.addEventListener('contextmenu', (e) => e.preventDefault());
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
			context.strokeStyle = squareItem.stroke;
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
		const { a, b, c, d, e, f } = canvasTransform;
		canvasContext.current.setTransform(a, b, c, d, e * a, f * a);
		redrawEverything();
	}, [canvasTransform]);

	const getAdjustedCoordinates = (event) => {
		const rect = canvasRef.current.getBoundingClientRect();

		const { a, d, e, f } = canvasTransform;
		// Calculate mouse coordinates relative to the canvas
		const mouseX = (event.clientX - rect.left) / a - e;
		const mouseY = (event.clientY - rect.top) / d - f;
		return [mouseX, mouseY];
	};

	const clickedController = (e) => {
		const [mouseX, mouseY] = getAdjustedCoordinates(e);
		e.preventDefault();
		if (e.button === 0) {
			setClicked(true);
			if (currentlyHoveredSquare.id) {
				const curSquare = squares.find(
					(i) => i.id === currentlyHoveredSquare.id
				);
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
						zIndex,
					},
				]);
				setZIndex((prev) => prev + 1);
				setActiveSquare({ id: currentSquareId });
			}
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
	}, [squares, activePage]);

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
						background: '#2234eb64',
						zIndex: currentSquare.zIndex,
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
										zIndex: i.zIndex,
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
										zIndex: i.zIndex,
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
										zIndex: i.zIndex,
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
										zIndex: i.zIndex,
									};
								default:
									break;
							}
						}
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
								zIndex: i.zIndex,
							};
						}
						return { ...i };
					})
				);
			} else {
				draw(e);
			}
		} else {
			const currentHoveredCPArray = [];
			const currentHoveredSquareArray = [];

			squares.forEach((squareElement) => {
				squareElement.controlPoints.forEach((cpElement) => {
					const dist = Math.sqrt(
						(cpElement.x - mouseX) * (cpElement.x - mouseX) +
							(cpElement.y - mouseY) * (cpElement.y - mouseY)
					);
					if (dist <= 12) {
						currentHoveredCPArray.push({
							currentHoveredCP: cpElement.type,
							currentHoveredSquare: squareElement,
						});
					}
				});
				if (
					mouseX >= squareElement.x &&
					mouseX <= squareElement.x + squareElement.width &&
					mouseY >= squareElement.y &&
					mouseY <= squareElement.y + squareElement.height
				) {
					currentHoveredSquareArray.push(squareElement);
				}
			});
			const mostRecentCP =
				currentHoveredCPArray[currentHoveredCPArray.length - 1];
			const mostRecentSquare =
				currentHoveredSquareArray[currentHoveredSquareArray.length - 1];
			if (!!mostRecentCP && !!mostRecentSquare) {
				if (
					mostRecentCP.currentHoveredSquare.zIndex >= mostRecentSquare.zIndex
				) {
					setCurrentlyHoveredCP({
						id: mostRecentCP.currentHoveredSquare.id,
						type: mostRecentCP.currentHoveredCP,
					});
					setCursor(
						[controlPoints.BOTTOM_RIGHT, controlPoints.TOP_LEFT].includes(
							mostRecentCP.currentHoveredCP
						)
							? pointerEnum.brtl
							: pointerEnum.bltr
					);
				} else {
					setCurrentlyHoveredSquare({
						id: mostRecentSquare.id,
						offsetX: currentlyHoveredSquare.offsetX,
						offsetY: currentlyHoveredSquare.offsetY,
					});
					setCursor(pointerEnum.default);
				}
			} else {
				if (mostRecentSquare) {
					if (currentlyHoveredSquare.id !== mostRecentSquare.id) {
						setCurrentlyHoveredSquare({
							id: mostRecentSquare.id,
							offsetX: currentlyHoveredSquare.offsetX,
							offsetY: currentlyHoveredSquare.offsetY,
						});
					}
				} else {
					setCurrentlyHoveredSquare({
						id: null,
						offsetX: 0,
						offsetY: 0,
					});
					setCursor(pointerEnum.default);
				}
				if (mostRecentCP) {
					setCurrentlyHoveredCP({
						id: mostRecentCP.currentHoveredSquare.id,
						type: mostRecentCP.currentHoveredCP,
					});
					setCursor(
						[controlPoints.BOTTOM_RIGHT, controlPoints.TOP_LEFT].includes(
							mostRecentCP.currentHoveredCP
						)
							? pointerEnum.brtl
							: pointerEnum.bltr
					);
				} else {
					setCurrentlyHoveredCP({
						id: null,
						type: null,
					});
					setCursor(pointerEnum.default);
				}
			}
		}
	};

	function detectMouseWheelDirection(e) {
		let direction = '';
		if (e.shiftKey) {
			if (e.deltaY > 0) {
				direction = 'right';
			} else {
				direction = 'left';
			}
		} else if (e.deltaY > 0) {
			direction = 'down';
		} else {
			direction = 'up';
		}
		return direction;
	}

	const scrollHandler = (event) => {
		const direction = detectMouseWheelDirection(event);
		const [mouseX, mouseY] = getAdjustedCoordinates(event);
		if (event.ctrlKey) {
			if (direction === 'up') {
				dispatch(
					zoomIn({
						event: {
							clientX: mouseX,
							clientY: mouseY,
						},
					})
				);
			} else {
				dispatch(
					zoomOut({
						event: {
							clientX: mouseX,
							clientY: mouseY,
						},
					})
				);
			}
		} else {
			switch (direction) {
				case 'down':
					dispatch(translateDown());
					break;
				case 'up':
					dispatch(translateUp());
					break;
				case 'right':
					dispatch(translateRight());
					break;
				case 'left':
					dispatch(translateLeft());
					break;
				default:
					dispatch(resetTransform());
			}
		}
		redrawEverything();
	};

	const contextMenuHandler = (event) => {
		dispatch(
			openContextMenu({
				event,
				menuContent: getMenuForCanvas(),
			})
		);
		event.preventDefault();
	};

	return (
		<CanvasWrapper sx={{ cursor }}>
			<canvas
				id="canvas-main"
				ref={canvasRef}
				onMouseDown={clickedController}
				onMouseUp={unclickedController}
				onMouseMove={moveHandler}
				// onScroll={scrollHandler}
				onWheel={scrollHandler}
				onContextMenu={contextMenuHandler}
			/>
		</CanvasWrapper>
	);
}

export default Canvas;
