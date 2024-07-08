import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DgnPropContainer } from './styled';
import {
	ListHeaderContainer,
	PageListContainer,
	PageListContainerHeader,
	Ty,
} from '../LayersList/styled';
import ColorPropertyComponent from '../../../../components/ui/ColorProperty';
import { setPageColor } from '../../../../store/reducers/pages';

function DesignPropertiesMenu() {
	const dispatch = useDispatch();
	// redux states
	const { activePage } = useSelector((state) => state.pages);

	// local states
	const [containerWidth] = useState(270);

	const changePageColor = (colorObj) => dispatch(setPageColor(colorObj));

	return (
		<DgnPropContainer width={containerWidth}>
			<ListHeaderContainer sx={{ gap: '8px' }}>
				<Ty active hoverEffect variant="layersListHeader">
					Design
				</Ty>
				<Ty hoverEffect variant="layersListHeader">
					Properties
				</Ty>
			</ListHeaderContainer>
			<PageListContainer>
				<PageListContainerHeader>
					<Box sx={{ flex: 1 }}>
						<Ty variant="layersListTitle">Page</Ty>
					</Box>
				</PageListContainerHeader>
				<ColorPropertyComponent
					color={activePage.pageColor}
					setColor={changePageColor}
					sx={{ marginTop: '10px' }}
				/>
			</PageListContainer>
			{/* for reference, the square (x,y) is at (679, 266) */}
			{/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<button
					onClick={() => {
						const rect = document
							.getElementById('canvas-main')
							.getBoundingClientRect();
						setSquares([
							{
								id: uuid(),
								x: rect.width / 2 - 50,
								y: rect.height / 2 - 50,
								width: 100,
								height: 100,
								controlPoints: [],
								controlPoints2: [],
								background: 'red',
								stroke: 'black',
								zIndex: 1,
							},
						]);
					}}
				>
					Reset Square
				</button>
				<button
					onClick={() => {
						const rect = document
							.getElementById('canvas-main')
							.getBoundingClientRect();
						setSquares([
							{
								id: uuid(),
								x: rect.width + rect.width / 2 - 50,
								y: rect.height + rect.height / 2 - 50,
								width: 100,
								height: 100,
								controlPoints: [],
								controlPoints2: [],
								background: 'red',
								stroke: 'black',
								zIndex: 1,
							},
						]);
					}}
				>
					Move Bottom Right
				</button>
				<button
					onClick={() => {
						dispatch(
							setTransform({
								a: 1,
								b: 0,
								c: 0,
								d: 1,
								e: -1400,
								_e: -1400,
								f: -700,
								_f: -700,
							})
						);
					}}
				>
					Move Canvas to bottom right
				</button>
				<button
					onClick={() => {
						const rect = document
							.getElementById('canvas-main')
							.getBoundingClientRect();
						dispatch(
							setTransform({
								a: transform.a + 1,
								b: 0,
								c: 0,
								d: transform.d + 1,
								e: transform.e,
								f: transform.f,
							})
						);
					}}
				>
					zoom in
				</button>
				<button
					onClick={() => {
						const rect = document
							.getElementById('canvas-main')
							.getBoundingClientRect();
						const { a, b, c, d, e, f, _e, _f } = transform;
						const factor = 1;
						const x = rect.width / 2 - _e;
						const y = rect.height / 2 - _f;
						let adjX = x;
						let adjY = y;
						dispatch(
							setTransform({
								a: transform.a + 1,
								b: 0,
								c: 0,
								d: transform.d + 1,
								e: -(adjX - adjX / (transform.a + 1)) + _e / (transform.a + 1),
								_e: _e,
								f: -(adjY - adjY / (transform.a + 1)) + _f / (transform.a + 1),
								_f: _f
							})
						);
					}}
				>
					zoom in custom
				</button>
				<button
					onClick={() => {
						const rect = document
							.getElementById('canvas-main')
							.getBoundingClientRect();
						dispatch(
							setTransform({
								a: transform.a - 0.2,
								b: 0,
								c: 0,
								d: transform.d - 0.2,
								e: -((rect.width / 2) * (transform.a - 0.2 - 1)),
								f: -((rect.height / 2) * (transform.a - 0.2 - 1)),
							})
						);
					}}
				>
					zoom out
				</button>
				<button
					onClick={(e) => {
						const rect = document
							.getElementById('canvas-main')
							.getBoundingClientRect();
						// console.log(e.clientX, e.clientY, 'original coordinates')
						console.log(rect.top, rect.left, 'canvas top/left');
						console.log(rect.width, rect.height, 'canvas width/ height');
						// console.log(e.clientX - rect.top, e.clientY - rect.left, 'rect adjusted coordinates')
						console.log(transform.scale, 'current zoom factor');
						console.log(transform.e, transform.f, 'translation factors');
						console.log('---------------');
						console.log('---------------');
					}}
				>
					click
				</button>
			</Box> */}
		</DgnPropContainer>
	);
}
export default DesignPropertiesMenu;
