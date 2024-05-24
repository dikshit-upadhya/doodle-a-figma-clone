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
// import { setTransform } from '../../../../store/reducers/canvas';

function DesignPropertiesMenu() {
	const dispatch = useDispatch();
	// redux states
	const { activePage } = useSelector((state) => state.pages);
	// const { transform } = useSelector((state) => state.canvas);

	// local states
	const [containerWidth] = useState(270);

	// methods
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
			{/* <button
				onClick={() => {
					dispatch(
						setTransform({
							a: transform.a + 0.2,
							b: 0,
							c: 0,
							d: transform.d + 0.2,
							e: -(679 * (transform.a + 0.2 - 1)),
							f: -(266 * (transform.a + 0.2 - 1)),
						})
					);
				}}
			>
				zoom in
			</button>
			<button
				onClick={() => {
					dispatch(
						setTransform({
							a: transform.a - 0.2,
							b: 0,
							c: 0,
							d: transform.d - 0.2,
							e: -(679 * (transform.a - 0.2 - 1)),
							f: -(266 * (transform.a - 0.2 - 1 )),
						})
					);
				}}
			>
				zoom out
			</button> */}
		</DgnPropContainer>
	);
}
export default DesignPropertiesMenu;
