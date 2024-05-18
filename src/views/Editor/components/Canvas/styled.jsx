import { Box, styled } from '@mui/material';

export const CanvasWrapper = styled(Box)(({ theme }) => ({
	background: theme.palette.lightGray,
	height: '100vh',
	width: '100vw',
	overflow: 'hidden',
}));

export const CanvasWrapper2 = styled(Box)(() => ({
	background: 'red',
	height: '100vh',
	width: '100vw',
	overflow: 'hidden',
}));
