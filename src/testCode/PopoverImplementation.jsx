// import {
// 	Box,
// 	ButtonBase,
// 	Popover,
// 	Popper,
// 	Typography,
// 	styled,
// } from '@mui/material';

// export const makeAnchorPosition = (e) => {
// 	if (!e) {
// 		return {
// 			top: 0,
// 			left: 0,
// 		};
// 	}
// 	return {
// 		top: e.clientY,
// 		left: e.clientX,
// 	};
// };

// const MenuItem = styled(ButtonBase, {
// 	shouldForwardProp: (props) => props !== 'lastItem',
// })(({ theme, lastItem }) => ({
// 	padding: lastItem ? '4px' : '4px 4px 0 4px',
// 	color: 'white',
// 	background: theme.palette.darkGray,
// 	width: '100%',
// }));
// const MenuWrapper = styled(Box)(() => ({
// 	display: 'flex',
// 	flexDirection: 'column',
// }));

// const GlobalMenu = ({
// 	anchorReference = 'anchorEl',
// 	anchorId,
// 	anchor,
// 	setAnchor,
// 	anchorPosition = makeAnchorPosition(),
// 	setAnchorPosition,
// 	anchorOriginVertical = 'bottom',
// 	anchorOriginHorizontal = 'right',
// 	transformOriginVertical = 'top',
// 	transformOriginHorizontal = 'left',
// 	menu = [
// 		{ title: 'Rename' },
// 		{ title: 'Duplicate', breakAfter: true },
// 		{ title: 'Delete' },
// 	],
// }) => {
// 	const constructProps = () => {
// 		const obj = {
// 			anchorReference,
// 		};
// 		if (anchorReference === 'anchorPosition') {
// 			obj.id = Boolean(anchorPosition) ? anchorId : undefined;
// 			obj.anchorPosition = anchorPosition;
// 			obj.onClose = () => setAnchorPosition(false);
// 			obj.open = Boolean(anchorPosition);
// 		} else if (anchorReference === 'anchorEl') {
// 			obj.id = Boolean(anchor) ? anchorId : undefined;
// 			obj.anchorEl = anchor;
// 			obj.onClose = () => setAnchor(null);
// 			obj.open = Boolean(anchor);
// 		}
// 		return obj;
// 	};

// 	return (
// 		<>
// 			{/* <Popper open={Boolean(anchor)} anchorEl={anchor} placement="top" >
// 				<MenuWrapper>
// 					{menu.map((menuItem, index) => (
// 						<MenuItem lastItem={menu?.length === index + 1}>
// 							<Typography textAlign="left" variant="globalMenu">
// 								{menuItem.title}
// 							</Typography>
// 						</MenuItem>
// 					))}
// 				</MenuWrapper>
// 			</Popper> */}
// 			<Popover
//         {...constructProps()}
//         disableScrollLock={true}
// 				anchorOrigin={{
// 					vertical: anchorOriginVertical,
// 					horizontal: anchorOriginHorizontal,
// 				}}
// 				transformOrigin={{
// 					vertical: transformOriginVertical,
// 					horizontal: transformOriginHorizontal,
// 				}}
// 			>
// 				<MenuWrapper>
// 					{menu.map((menuItem, index) => (
// 						<MenuItem lastItem={menu?.length === index + 1}>
// 							<Typography textAlign="left" variant="globalMenu" >{menuItem.title}</Typography>
// 						</MenuItem>
// 					))}
// 				</MenuWrapper>
// 			</Popover>
// 		</>
// 	);
// };

// export default GlobalMenu;
