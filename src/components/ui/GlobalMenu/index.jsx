import {
	Box,
	ButtonBase,
	ClickAwayListener,
	Divider,
	Typography,
	styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import PropTypes from 'prop-types';
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
	minWidth: '150px',
	background: theme.palette.darkerGray,
	padding: '4px 0px',
	borderRadius: '4px',
}));

const MenuWrapper2 = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	right: 0,
	transform: 'translateX(100%)',
	zIndex: 1000,
	display: 'flex',
	flexDirection: 'column',
	boxShadow: `0px 0px 12px 7px rgba(0,0,0,0.22)`,
	border: '0.3px solid rgba(255, 255, 255, 0.2)',
	minWidth: '150px',
	background: theme.palette.darkerGray,
	padding: '4px 0px',
	borderRadius: '4px',
}));

const MenuItem = styled(ButtonBase, {
	shouldForwardProp: (props) => props !== 'lastItem',
})(({ theme, disabled }) => ({
	padding: '0 14px',
	color: disabled ? 'rgba(255, 255, 255, 0.4)' : 'white',
	width: '100%',
	zIndex: 1000,
	display: 'flex',
	justifyContent: 'space-between',
	...(!disabled && {
		'&:hover': {
			background: theme.palette.brightBlue,
		},
	}),
}));

const MenuTy = styled(Typography)(() => ({
	padding: '4px 0px',
}));

function GlobalContextMenu() {
	const dispatch = useDispatch();
	const [activeParent, setActiveParent] = useState();
	const [hoveredMenuItem, setHoveredMenuItem] = useState();

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
								if (menuItem.children.length > 0) return;
								if (menuItem.onClick) menuItem.onClick();
								dispatch(closeContextMenu());
							}}
							onMouseEnter={() => {
								setHoveredMenuItem(menuItem);
								if (menuItem.children.length > 0) {
									setActiveParent({
										id: menuItem.id,
									});
								} else {
									setActiveParent({});
								}
							}}
							lastItem={menuContent?.length === index + 1}
						>
							<MenuTy noWrap component="span" variant="globalMenu">
								{menuItem.title}
							</MenuTy>
							{menuItem.children?.length > 0 && <ArrowRightRoundedIcon />}
							{activeParent?.id === menuItem?.id &&
								Boolean(hoveredMenuItem?.children) && (
									<GlobalContextMenuChildren
										menuContent={hoveredMenuItem?.children}
									/>
								)}
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

function GlobalContextMenuChildren({ menuContent }) {
	const dispatch = useDispatch();
	const [activeParent, setActiveParent] = useState();
	const [hoveredMenuItem, setHoveredMenuItem] = useState();

	return (
		<ClickAwayListener onClickAway={() => dispatch(closeContextMenu())}>
			<MenuWrapper2>
				{menuContent.map((menuItem, index) => (
					<>
						<MenuItem
							disabled={menuItem.disabled}
							onClick={() => {
								if (menuItem.children.length > 0) return;
								if (menuItem.onClick) menuItem.onClick();
								dispatch(closeContextMenu());
							}}
							onMouseEnter={() => {
								setHoveredMenuItem(menuItem);
								if (menuItem.children.length > 0) {
									setActiveParent({
										id: menuItem.id,
									});
								} else {
									setActiveParent({});
								}
							}}
							lastItem={menuContent?.length === index + 1}
						>
							<MenuTy noWrap component="span" variant="globalMenu">
								{menuItem.title}
							</MenuTy>
							{menuItem.children?.length > 0 && <ArrowRightRoundedIcon />}
							{activeParent?.id === menuItem?.id &&
								Boolean(hoveredMenuItem?.children) && (
									<GlobalContextMenuChildren
										menuContent={hoveredMenuItem?.children}
									/>
								)}
						</MenuItem>
						{menuItem.breakAfter && (
							<Divider sx={{ border: DRAWER_WHITE_BORDER, margin: '5px 0' }} />
						)}
					</>
				))}
			</MenuWrapper2>
		</ClickAwayListener>
	);
}

GlobalContextMenuChildren.propTypes = {
	menuContent: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default GlobalContextMenu;
