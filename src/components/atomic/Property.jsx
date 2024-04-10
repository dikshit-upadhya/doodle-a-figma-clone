import { styled, Box, InputBase } from '@mui/material';
import { borderWhite } from '../../utils/contants';

export const PropertyContainer = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'stretch',
	marginLeft: '-4px',
	'&:hover > div': {
		padding: '4.5px',
		borderRight: borderWhite,
		borderTop: borderWhite,
		borderBottom: borderWhite,
	},
	'&:hover > div:nth-child(1)': {
		padding: '4.5px',
		border: borderWhite,
	},
}));

export const PropertyDetails = styled(Box)(() => ({
	padding: '5px',
	display: 'flex',
	gap: '10px',
	justifyContent: 'left',
	alignItems: 'center',
	'&:hover': {
		// border: borderWhite
	},
}));

export const ColorProperty = styled(Box)(() => ({
	height: '12px',
	width: '12px',
	borderRadius: '2px',
	backgroundColor: 'red',
}));

export const ColorValue = styled(InputBase, { label: 'ColorValue' })(() => ({
	fontSize: '12px',
	fontFamily: 'Inter',
	width: '60px',
	color: 'white',
	'& .MuiInputBase-input': {
		padding: 0,
	},
}));
