import { KeyboardArrowDownRounded } from '@mui/icons-material';
import { Box, Typography, styled } from '@mui/material';

export const Toolbar = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	background: theme.palette.gray,
	height: '48px',
	width: '100vw',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

export const ToolbarFlexItems = styled(Box)(() => ({
	display: 'flex',
	gap: '15px',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const ToolbarLeft = styled(Box)(() => ({
	position: 'absolute',
	left: 0,
	top: 0,
	height: '100%',
	display: 'flex',
	alignItems: 'center',
}));

export const Ty = styled(Typography)(() => ({
	color: 'white',
	fontFamily: 'Inter',
}));

export const ToolItems = styled(Box)(({ theme, arrow, active }) => ({
	width: arrow ? '50px' : '40px',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	background: active ? theme.palette.brightBlue : '',
	'&:hover': {
		background: !active ? theme.palette.darkerGray : theme.palette.brightBlue,
	},
}));

export const ToolImage = styled('img')(({ size }) => ({
	height: size === 'small' ? '18px' : '22px',
}));

export const KeyboardArrowDownRoundedIconStyled = styled(
	KeyboardArrowDownRounded
)(({ position = 'absolute' }) => ({
	fontSize: '12px',
	color: 'white',
	position,
	top: '50%',
	right: '-12px',
	transform: position === 'absolute' ? 'translateY(-50%)' : '',
}));
