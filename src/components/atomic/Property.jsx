import { styled, Box, InputBase } from '@mui/material';
import { DRAWER_WHITE_BORDER } from '../../utils/contants';

export const PropertyContainer = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'stretch',
	marginLeft: '-4px',
	'&:hover > div': {
		padding: '4.5px',
		borderRight: DRAWER_WHITE_BORDER,
		borderTop: DRAWER_WHITE_BORDER,
		borderBottom: DRAWER_WHITE_BORDER,
	},
	'&:hover > div:nth-of-type(1)': {
		padding: '4.5px',
		border: DRAWER_WHITE_BORDER,
	},
}));

export const PropertyDetails = styled(Box)(() => ({
	padding: '5px',
	display: 'flex',
	gap: '10px',
	justifyContent: 'left',
	alignItems: 'center',
	'&:hover': {
		// border: DRAWER_WHITE_BORDER
	},
}));

export const ColorIndicator = styled(Box)(({ color }) => ({
	height: '12px',
	width: '12px',
	borderRadius: '2px',
	backgroundColor: color,
}));

export const ColorValue = styled(InputBase, { label: 'ColorValue' })(() => ({
	fontSize: '12px',
	fontFamily: 'Inter',
	width: '70px',
	color: 'white',
	'& .MuiInputBase-input': {
		padding: 0,
	},
}));
