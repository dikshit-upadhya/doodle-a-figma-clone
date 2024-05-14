import { Box, IconButton, Typography, styled } from '@mui/material';

import { DRAWER_WHITE_BORDER } from '../../../../utils/contants';

export const ListContainer = styled(Box)(({ theme, width }) => ({
	height: `calc(100vh - 48px)`,
	position: 'fixed',
	top: '48px',
	width: `${width}px`,
	background: theme.palette.gray,
	display: 'flex',
	flexDirection: 'column',
}));

export const ListHeaderContainer = styled(Box)(() => ({
	padding: '8px 15px',
	display: 'flex',
	alignItems: 'center',
	borderTop: DRAWER_WHITE_BORDER,
	borderBottom: DRAWER_WHITE_BORDER,
	height: '22px',
}));

export const SearchIconBox = styled(Box)({
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
});

export const SearchIconButton = styled(IconButton)({
	color: 'white',
	fontSize: '14px',
	padding: '2px',
});

export const Ty = styled(Typography, {
	shouldForwardProp: (props) => props !== 'active' && props !== 'hoverEffect',
})(({ hoverEffect, active }) => {
	const getColorForTy = () => {
		if (hoverEffect) {
			return active ? 'white' : 'rgba(255, 255, 255, 0.7)';
		}
		return 'white';
	};

	return {
		color: getColorForTy(),
		fontWeight: active ? 'bold' : 'normal',
		cursor: 'default',
		userSelect: 'none',
		'&:hover': {
			color: 'white',
			fontWeight: 'bold',
		},
	};
});

export const PageListContainer = styled(Box)({
	borderBottom: DRAWER_WHITE_BORDER,
	padding: '8px 15px 15px 15px',
});

export const PageListContainerHeader = styled(Box)({
	display: 'flex',
	alignItems: 'center',
});

export const PageListItemsContainer = styled(Box)(() => ({
	paddingTop: '10px',
}));

export const IconWrapper = styled(Box)({
	width: '25px',
	color: 'white',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const PageListItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	padding: '8px',
	alignItems: 'center',
	borderRadius: '8px',
	'&:hover': {
		background: theme.palette.darkGray,
	},
}));

export const FreePagesContainer = styled(Box)(({ theme }) => ({
	marginTop: '10px',
	borderRadius: '4px',
	borderTop: `solid 5px ${theme.palette.brightBlue}`,
	background: 'rgba(255,255,255,0.05)',
	padding: '11px 15px 15px 15px',
}));

export const Ty2 = styled(Typography)(() => ({
	color: 'white',
	cursor: 'default',
	userSelect: 'none',
}));

export const LayersListItemsContainer = styled(Box)(({ theme }) => ({
	flex: 1,
	overflowY: 'scroll',
	overflowX: 'hidden',
	boxSizing: 'border-box',
	'&::-webkit-scrollbar': {
		width: '12px',
	},
	'&::-webkit-scrollbar-track': {
		borderLeft: DRAWER_WHITE_BORDER,
	},
	'&::-webkit-scrollbar-thumb': {
		borderRadius: '8px',
		background: 'rgba(255, 255, 255, 0.18)',
		marginLeft: '5px',
		border: `3px solid ${theme.palette.gray}`,
	},
	'&::-webkit-scrollbar-thumb:hover': {
		background: 'rgba(255,255,255,0.25)',
	},
	'&::-webkit-scrollbar-corner': {
		display: 'none',
	},
}));

export const LayerItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: '8px',
	outlineOffset: '-1.5px',
	'&:hover': {
		outline: `0.5px solid ${theme.palette.brightBlue}`,
	},
}));

export const LayerTypeIcon = styled('img')({
	height: '14px',
	width: '14px',
});

export const ListContainerResizer = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	right: -1,
	width: '5px',
	height: '100%',
	cursor: 'e-resize',
	'&:hover': {
		background: theme.palette.brightBlue,
	},
}));
