import { useState } from 'react';
import { Box } from '@mui/material';
import { DgnPropContainer } from './styled';
import {
	ListHeaderContainer,
	PageListContainer,
	PageListContainerHeader,
	Ty,
} from '../LayersList/styled';
import ColorPropertyComponent from '../../../../components/ui/ColorProperty';

function DesignPropertiesMenu() {
	const [containerWidth] = useState(270);

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
				{[1, 2, 3].map((_item, index) => (
					<ColorPropertyComponent sx={index === 0 && { marginTop: '10px' }} />
				))}
			</PageListContainer>
		</DgnPropContainer>
	);
}
export default DesignPropertiesMenu;
