import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
	KeyboardArrowDownRoundedIconStyled,
	ToolImage,
	ToolItems,
	Toolbar,
	ToolbarLeft,
	ToolbarRight,
	Ty,
} from './styled';
import LOGO_SVG from '../../../../assets/Toolbar/mainLogo.svg';
import MOUSE_SVG from '../../../../assets/Toolbar/mouse.svg';
import FRAME_SVG from '../../../../assets/Toolbar/frame.svg';
import PEN_SVG from '../../../../assets/Toolbar/pen.svg';
import RECTANGLE_SVG from '../../../../assets/Toolbar/rectangle.svg';
import TYPOGRAPHY_SVG from '../../../../assets/Toolbar/typography.svg';
import HAND_SVG from '../../../../assets/Toolbar/hand.svg';
import COMMENT_SVG from '../../../../assets/Toolbar/comment.svg';
import { openContextMenu } from '../../../../store/reducers/globalContextMenu';
import {
	getMenuForFrame,
	getMenuForMainMenu,
	getMenuForPen,
	getMenuForRectangle,
	getMenuForZoomMenu,
} from '../../../../common/globalMenuHandlers';
import BrightBlueButton from '../../../../components/atomic/Buttons/BrightBlueButton';
import PersonAvatar from '../../../../components/atomic/Avatar/avatar';

function ToolbarComponent() {
	const dispatch = useDispatch();

	return (
		<Toolbar>
			<ToolbarLeft>
				<ToolItems
					arrow
					onClick={(event) => {
						dispatch(
							openContextMenu({
								event,
								menuContent: getMenuForMainMenu(),
								anchor: 'BOTTOM',
							})
						);
					}}
				>
					<Box
						sx={{
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ToolImage src={LOGO_SVG} alt="mainLogo" />
						<KeyboardArrowDownRoundedIconStyled />
					</Box>
				</ToolItems>
				{[
					{ icon: MOUSE_SVG },
					{ icon: FRAME_SVG, menuContent: getMenuForFrame(), active: true },
					{ icon: RECTANGLE_SVG, menuContent: getMenuForRectangle() },
					{ icon: PEN_SVG, menuContent: getMenuForPen() },
					{ icon: TYPOGRAPHY_SVG },
					{ icon: HAND_SVG },
					{ icon: COMMENT_SVG },
				].map((toolbarItem) => (
					<ToolItems
						active={toolbarItem.active}
						arrow={Boolean(toolbarItem.menuContent)}
						onClick={(event) => {
							dispatch(
								openContextMenu({
									event,
									menuContent: toolbarItem.menuContent,
									anchor: 'BOTTOM',
								})
							);
						}}
					>
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ToolImage size="small" src={toolbarItem.icon} alt="mouseLogo" />
							{Boolean(toolbarItem.menuContent) && (
								<KeyboardArrowDownRoundedIconStyled position="static" />
							)}
						</Box>
					</ToolItems>
				))}
			</ToolbarLeft>
			<Box>
				<Ty variant="commonText">Untitled-01</Ty>
			</Box>
			<ToolbarRight>
				<PersonAvatar content={{ type: 'text', content: 'D' }} />
				<BrightBlueButton title="Share" />
				<ToolItems
					onClick={(event) => {
						dispatch(
							openContextMenu({
								event,
								menuContent: getMenuForZoomMenu(),
								anchor: 'BOTTOM-LEFT',
							})
						);
					}}
					width="60px"
				>
					<Typography
						textAlign="left"
						variant="toolbarText"
						color="white"
						noWrap
					>
						100%
					</Typography>
					<KeyboardArrowDownRoundedIconStyled
						sx={{ marginLeft: '4px' }}
						position="static"
					/>
				</ToolItems>
			</ToolbarRight>
		</Toolbar>
	);
}

export default ToolbarComponent;
