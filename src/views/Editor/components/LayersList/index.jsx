import React, { useEffect, useState } from 'react';
import {
	AddRounded,
	ArrowDropDown,
	ArrowRight,
	CheckRounded,
	KeyboardArrowDown,
	KeyboardArrowUp,
	SearchRounded,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import {
	FreePagesContainer,
	IconWrapper,
	LayerItem,
	LayerTypeIcon,
	LayersListItemsContainer,
	ListContainer,
	ListContainerResizer,
	ListHeaderContainer,
	PageListContainer,
	PageListContainerHeader,
	PageListItem,
	PageListItemsContainer,
	SearchIconBox,
	SearchIconButton,
	Ty,
	Ty2,
} from './styled';
import { testLayersArr } from '../../../../testCode/testConstants';

function LayerRowItem(props) {
	const { item, leftPadding } = props;
	const [childrenOpen, setChildrenOpen] = useState(false);

	return (
		<>
			<LayerItem sx={{ paddingLeft: `${leftPadding}px` }}>
				<IconWrapper
					onClick={() => {
						if (item?.children) {
							setChildrenOpen((prev) => !prev);
						}
					}}
				>
					{item?.children &&
						(childrenOpen ? (
							<ArrowDropDown sx={{ fontSize: '14px' }} />
						) : (
							<ArrowRight sx={{ fontSize: '14px' }} />
						))}
				</IconWrapper>
				<Box sx={{ display: 'flex', gap: '10px' }}>
					<LayerTypeIcon src={item.type.icon} />
					<Ty2 noWrap variant="layersListText">
						{item?.name}
					</Ty2>
				</Box>
			</LayerItem>
			{childrenOpen
				? item?.children?.map((layerRowItem) => (
						<LayerRowItem
							item={layerRowItem}
							leftPadding={(leftPadding || 0) + 20}
						/>
					))
				: ''}
		</>
	);
}

LayerRowItem.propTypes = {
	leftPadding: PropTypes.number.isRequired,
	item: PropTypes.shape({
		type: PropTypes.shape({
			icon: PropTypes.node,
		}),
		name: PropTypes.string,
		children: PropTypes.arrayOf({}),
	}).isRequired,
};

function LayersList() {
	const [isPagesDroppedDown, setIsPagesDroppedDown] = useState(true);
	const [containerWidth, setContainerWidth] = useState(270);
	const [clicked, setClicked] = useState(false);

	const clickHandler = (e) => {
		e.preventDefault();
		setClicked(true);
	};

	const moveHandler = (e) => {
		e.stopPropagation();
		if (clicked) {
			if (e.clientX < 500 && e.clientX > 200) setContainerWidth(e.clientX);
		}
	};

	const unclickHandler = () => {
		setClicked(false);
		window.removeEventListener('mouseup', unclickHandler);
		window.removeEventListener('mousemove', moveHandler);
	};

	useEffect(() => {
		if (clicked) {
			window.addEventListener('mousemove', moveHandler);
			window.addEventListener('mouseup', unclickHandler);
		}
	}, [clicked]);

	return (
		<ListContainer width={containerWidth}>
			<ListHeaderContainer>
				<SearchIconBox>
					<SearchIconButton>
						<SearchRounded sx={{ fontSize: 'inherit' }} />
					</SearchIconButton>
					<Ty active hoverEffect variant="layersListHeader">
						Layers
					</Ty>
					<Ty hoverEffect variant="layersListHeader">
						Assets
					</Ty>
				</SearchIconBox>
				<SearchIconBox
					sx={{ flex: '0 1 auto' }}
					onClick={() => {
						setIsPagesDroppedDown((prev) => !prev);
					}}
				>
					<Ty variant="layersListHeader">Page 1</Ty>
					<SearchIconButton>
						{isPagesDroppedDown ? (
							<KeyboardArrowUp sx={{ fontSize: '18px' }} />
						) : (
							<KeyboardArrowDown sx={{ fontSize: '18px' }} />
						)}
					</SearchIconButton>
				</SearchIconBox>
			</ListHeaderContainer>
			{isPagesDroppedDown && (
				<PageListContainer>
					<PageListContainerHeader>
						<Box sx={{ flex: 1 }}>
							<Ty variant="layersListTitle">Pages</Ty>
						</Box>
						<Box>
							<SearchIconButton>
								<AddRounded sx={{ fontSize: '18px' }} />
							</SearchIconButton>
						</Box>
					</PageListContainerHeader>
					<PageListItemsContainer>
						{[
							{ pageName: 1 },
							{ pageName: 2 },
							{ pageName: 3 },
							{ pageName: 4 },
						].map((item) => (
							<PageListItem>
								<IconWrapper>
									{item.pageName === 1 && (
										<CheckRounded sx={{ fontSize: '14px', color: 'white' }} />
									)}
								</IconWrapper>
								<Ty variant="layersListTitle" sx={{ flex: 1 }}>
									Page {item.pageName}
								</Ty>
							</PageListItem>
						))}
					</PageListItemsContainer>
					<FreePagesContainer>
						<Ty2 component="div" variant="layersListTitle">
							Unlimited Pages Left
						</Ty2>
						<Ty2
							component="div"
							variant="layersListTitle"
							sx={{ marginTop: '4px', color: 'brightBlueText' }}
						>
							{`You don't need any plans!`}
						</Ty2>
					</FreePagesContainer>
				</PageListContainer>
			)}
			<LayersListItemsContainer>
				{testLayersArr.map((item) => (
					<LayerRowItem item={item} leftPadding={0} />
				))}
			</LayersListItemsContainer>
			<ListContainerResizer onMouseDown={clickHandler} />
		</ListContainer>
	);
}

export default LayersList;
