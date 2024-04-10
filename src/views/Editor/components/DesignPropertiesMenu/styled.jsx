import { Box, styled } from '@mui/material';
import { borderWhite } from '../../../../utils/contants';

export const DgnPropContainer = styled(Box)(({ theme, width }) => ({
	height: `calc(100vh - 48px)`,
	position: 'fixed',
	top: '48px',
	right: 0,
	width: `${width}px`,
	borderTop: borderWhite,
	background: theme.palette.gray,
}));

export const DgnPropContent = styled(Box)(() => ({
	borderTop: borderWhite,
}));
