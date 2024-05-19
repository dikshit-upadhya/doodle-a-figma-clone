import {
	Box,
	ButtonBase,
	ClickAwayListener,
	Divider,
	Typography,
	styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { closeContextMenu } from '../../../store/reducers/globalContextMenu';
import { DRAWER_WHITE_BORDER } from '../../../utils/contants';

const MenuWrapper = styled(Box)(({ theme, coordinates }) => ({
	position: 'absolute',
	top: coordinates.top,
	left: coordinates.left,
	zIndex: 1000,
	display: 'flex',
	flexDirection: 'column',
	boxShadow: `0px 0px 12px 7px rgba(0,0,0,0.22)`,
	border: '0.3px solid rgba(255, 255, 255, 0.2)',
	width: '150px',
	background: theme.palette.darkerGray,
	padding: '4px 0px',
	borderRadius: '4px',
}));

const MenuItem = styled(ButtonBase, {
	shouldForwardProp: (props) => props !== 'lastItem',
})(({ theme, lastItem, disabled }) => ({
	padding: lastItem ? '4px 14px' : '4px 14px',
	color: disabled ? 'rgba(255, 255, 255, 0.4)' : 'white',
	width: '100%',
	zIndex: 1000,
	display: 'flex',
	justifyContent: 'left',
	...(!disabled && {
		'&:hover': {
			background: theme.palette.brightBlue,
		},
	}),
}));

function GlobalContextMenu() {
	const dispatch = useDispatch();

	const { coordinates, active, menuContent } = useSelector(
		(state) => state.globalContextMenu
	);

	if (!active) return '';

	return (
		<ClickAwayListener onClickAway={() => dispatch(closeContextMenu())}>
			<MenuWrapper coordinates={coordinates}>
				{menuContent.map((menuItem, index) => (
					<>
						<MenuItem
							disabled={menuItem.disabled}
							onClick={() => {
								if (menuItem.onClick) menuItem.onClick();
								dispatch(closeContextMenu());
							}}
							lastItem={menuContent?.length === index + 1}
						>
							<Typography component="span" variant="globalMenu">
								{menuItem.title}
							</Typography>
						</MenuItem>
						{menuItem.breakAfter && (
							<Divider sx={{ border: DRAWER_WHITE_BORDER, margin: '5px 0' }} />
						)}
					</>
				))}
			</MenuWrapper>
		</ClickAwayListener>
	);
}

export default GlobalContextMenu;
