import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DgnPropContainer } from './styled';
import {
	ListHeaderContainer,
	PageListContainer,
	PageListContainerHeader,
	Ty,
} from '../LayersList/styled';
import ColorPropertyComponent from '../../../../components/ui/ColorProperty';

const INITIAL_COLOR = {
	hex: '#ffffffff',
	rgb: { r: 255, g: 255, b: 255, a: 1 },
};

function DesignPropertiesMenu() {
	const [containerWidth] = useState(270);
	const [color, setColor] = useState(INITIAL_COLOR);

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
				{/* <button
					onClick={() => {
						setColor({
							hex: '#462a2aba',
							rgb: { r: 70, g: 42, b: 42, a: 0.72 },
						});
					}}
				>
					click
				</button> */}
				<ColorPropertyComponent
					color={color}
					setColor={setColor}
					sx={{ marginTop: '10px' }}
				/>
			</PageListContainer>
		</DgnPropContainer>
	);
}
export default DesignPropertiesMenu;
