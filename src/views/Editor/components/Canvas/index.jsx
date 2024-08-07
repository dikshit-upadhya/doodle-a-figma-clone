import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { CanvasWrapper } from './styled';
import { openContextMenu } from '../../../../store/reducers/globalContextMenu';
import { getMenuForCanvas } from '../../../../common/globalMenuHandlers';
import {
	resetTransform,
	translateDown,
	translateLeft,
	translateRight,
	translateUp,
	zoomIn,
	zoomOut,
} from '../../../../store/reducers/canvas';
import useLayers from '../../../../hooks/useLayers';
import { layerTypeEnum } from '../../../../utils/contants';
import { drawRectangles } from './methods';
import { addLayer, setLayers } from '../../../../store/reducers/layers';

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
	const [, flatLayers, seggregatedLayers] = useLayers();
	// redux status
	const { activePage } = useSelector((state) => state.pages);
	const { transform: canvasTransform } = useSelector((state) => state.canvas);
	// local states
	const [clicked, setClicked] = useState(false);
	// const [squares, setSquares] = useState([]);

	const [zIndex, setZIndex] = useState(1);
	const [activeSquare, setActiveSquare] = useState([]);
	const [currentlyHoveredLayer, setCurrentlyHoveredLayer] = useState({
		id: '',
		type: null,
		props: {
			offsetX: 0,
			offsetY: 0,
		},
	});
	const [currentlyHoveredCP, setCurrentlyHoveredCP] = useState({
		id: '',
		type: '',
	});
	const [cursor, setCursor] = useState(pointerEnum.default);

	// refs
	const canvasRef = useRef();
	const canvasContext = useRef(null);

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

	const redrawEverything = () => {
		const context = canvasContext.current;
		resetCanvas();
		drawRectangles(seggregatedLayers.rectangles, context);
	};

	useEffect(() => {
		const context = canvasRef.current.getContext('2d');
		context.setTransform(canvasTransform);
		canvasContext.current = context;
		canvasRef.current.width = window.innerWidth;
		canvasRef.current.height = window.innerHeight;
		redrawEverything();
		window.addEventListener('contextmenu', (e) => e.preventDefault());
	}, []);

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
			if (currentlyHoveredLayer.id) {
				// if (currentlyHoveredLayer.type === layerTypeEnum.RECTANGLE) {
				const curSquare = flatLayers.find(
					(i) => i.id === currentlyHoveredLayer.id
				);
				setCurrentlyHoveredLayer({
					id: curSquare.id,
					offsetX: Math.abs(curSquare.prop.x - mouseX),
					offsetY: Math.abs(curSquare.prop.y - mouseY),
				});
				// }
			} else {
				const currentSquareId = uuid();
				dispatch(
					addLayer({
						name: 'Rectangle',
						id: currentSquareId,
						type: layerTypeEnum.RECTANGLE.type,
						parentId: null,
						children: [],
						prop: {
							x: mouseX,
							y: mouseY,
							width: 0,
							height: 0,
							stroke: 'red',
							background: 'blue',
							zIndex,
						},
					})
				);
				setZIndex((prev) => prev + 1);
				setActiveSquare({ id: currentSquareId });
			}
		}
	};

	const unclickedController = () => {
		// this function is so that when mouse clicks and draws square in opposite x direction or the opposite y direction. This function redefines the x and y coordinates of the square
		const getModifiedSquaresForUnclickedSituation = (prev) => {
			const reqdArr = prev
				.filter((i) => i.prop.width !== 0 || i.prop.height !== 0)
				.map((item) => {
					const prop = item.prop;
					const newProps = {};
					if (prop.width <= 0) {
						newProps.x = prop.x + prop.width;
						newProps.width = Math.abs(prop.width);
					} else {
						newProps.x = prop.x;
						newProps.width = prop.width;
					}
					if (prop.height <= 0) {
						newProps.y = prop.y + prop.height;
						newProps.height = Math.abs(prop.height);
					} else {
						newProps.y = prop.y;
						newProps.height = prop.height;
					}
					const newControlPoints = [
						{ x: newProps.x, y: newProps.y, type: controlPoints.TOP_LEFT },
						{
							x: newProps.x + newProps.width,
							y: newProps.y,
							type: controlPoints.TOP_RIGHT,
						},
						{
							x: newProps.x,
							y: newProps.y + newProps.height,
							type: controlPoints.BOTTOM_LEFT,
						},
						{
							x: newProps.x + newProps.width,
							y: newProps.y + newProps.height,
							type: controlPoints.BOTTOM_RIGHT,
						},
					];
					return {
						...item,
						prop: {
							...prop,
							...newProps,
							controlPoints: newControlPoints,
						},
					};
				});
			return reqdArr;
		};
		dispatch(setLayers(getModifiedSquaresForUnclickedSituation(flatLayers)));
		setClicked(false);
		setActiveSquare({ id: null, offsetX: 10, offsetY: 10 });
	};

	useEffect(() => {
		redrawEverything();
	}, [flatLayers, activePage]);

	const draw = (e) => {
		const [mouseX, mouseY] = getAdjustedCoordinates(e);
		// find the square that you are currently drawing.
		const currentSquare = flatLayers.find((i) => i.id === activeSquare.id);
		const getUpdatedLayersForDrawSituation = (prev) => [
			...prev.map((i) => {
				if (i.id === currentSquare.id) {
					return {
						...currentSquare,
						prop: {
							...currentSquare.prop,
							width: mouseX - currentSquare.prop.x,
							height: mouseY - currentSquare.prop.y,
						},
					};
				}
				return i;
			}),
		];
		dispatch(setLayers(getUpdatedLayersForDrawSituation(flatLayers)));
	};

	const moveHandler = (e) => {
		const [mouseX, mouseY] = getAdjustedCoordinates(e);
		if (clicked) {
			if (currentlyHoveredCP.id) {
				const getLayersForCurrentlyHoveredCPSituation = (prev) =>
					prev.map((i) => {
						if (i.id === currentlyHoveredCP.id) {
							switch (currentlyHoveredCP.type) {
								case controlPoints.TOP_LEFT:
									return {
										...i,
										prop: {
											...i.prop,
											x: mouseX,
											y: mouseY,
											controlPoints: [],
											width: i.prop.x + i.prop.width - mouseX,
											height: i.prop.y + i.prop.height - mouseY,
										},
									};
								case controlPoints.TOP_RIGHT:
									return {
										...i,
										prop: {
											...i.prop,
											y: mouseY,
											controlPoints: [],
											width: mouseX - i.prop.x,
											height: i.prop.y + i.prop.height - mouseY,
										},
									};
								case controlPoints.BOTTOM_LEFT:
									return {
										...i,
										prop: {
											...i.prop,
											x: mouseX,
											controlPoints: [],
											width: i.prop.width + i.prop.x - mouseX,
											height: mouseY - i.prop.y,
										},
									};
								case controlPoints.BOTTOM_RIGHT:
									return {
										...i,
										prop: {
											...i.prop,
											controlPoints: [],
											width: mouseX - i.prop.x,
											height: mouseY - i.prop.y,
										},
									};
								default:
									break;
							}
						}
						return { ...i };
					});
				dispatch(
					setLayers(getLayersForCurrentlyHoveredCPSituation(flatLayers))
				);
			} else if (currentlyHoveredLayer.id) {
				const getUpdatedLayersForSquareHoveredSitutation = (prev) =>
					prev.map((i) => {
						if (i.id === currentlyHoveredLayer.id) {
							return {
								...i,
								prop: {
									...i.prop,
									x: mouseX - currentlyHoveredLayer.offsetX,
									y: mouseY - currentlyHoveredLayer.offsetY,
									controlPoints: [],
								},
							};
						}
						return { ...i };
					});
				dispatch(
					setLayers(getUpdatedLayersForSquareHoveredSitutation(flatLayers))
				);
			} else {
				draw(e);
			}
		} else {
			const currentHoveredCPArray = [];
			const currentHoveredSquareArray = [];

			flatLayers.forEach((layerElement) => {
				const prop = layerElement.prop;
				prop?.controlPoints.forEach((cpElement) => {
					const dist = Math.sqrt(
						(cpElement.x - mouseX) * (cpElement.x - mouseX) +
							(cpElement.y - mouseY) * (cpElement.y - mouseY)
					);
					if (dist <= 12) {
						currentHoveredCPArray.push({
							currentHoveredCP: cpElement.type,
							currentHoveredSquare: layerElement,
						});
					}
				});
				if (
					mouseX >= prop.x &&
					mouseX <= prop.x + prop.width &&
					mouseY >= prop.y &&
					mouseY <= prop.y + prop.height
				) {
					currentHoveredSquareArray.push(layerElement);
				}
			});
			const mostRecentCP =
				currentHoveredCPArray[currentHoveredCPArray.length - 1];
			const mostRecentSquare =
				currentHoveredSquareArray[currentHoveredSquareArray.length - 1];
			if (!!mostRecentCP && !!mostRecentSquare) {
				if (
					mostRecentCP.currentHoveredSquare.prop.zIndex >=
					mostRecentSquare.prop.zIndex
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
					setCurrentlyHoveredLayer({
						id: mostRecentSquare.id,
						offsetX: currentlyHoveredLayer.offsetX,
						offsetY: currentlyHoveredLayer.offsetY,
					});
					setCursor(pointerEnum.default);
				}
			} else {
				if (mostRecentSquare) {
					if (currentlyHoveredLayer.id !== mostRecentSquare.id) {
						setCurrentlyHoveredLayer({
							id: mostRecentSquare.id,
							offsetX: currentlyHoveredLayer.offsetX,
							offsetY: currentlyHoveredLayer.offsetY,
						});
					}
				} else {
					setCurrentlyHoveredLayer({
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
