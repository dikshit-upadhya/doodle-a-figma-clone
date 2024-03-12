import React, { useEffect, useRef, useState } from 'react';
import {
	AddRounded,
	ArrowDropDown,
	ArrowRight,
	CheckRounded,
	KeyboardArrowDown,
	KeyboardArrowUp,
	SearchRounded,
} from '@mui/icons-material';
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
import { Box } from '@mui/material';
import { testLayersArr } from '../../../../testCode/testConstants';

function LayerRowItem(props) {
	const { item } = props;
	const [childrenOpen, setChildrenOpen] = useState(false);

	return (
		<>
			<LayerItem sx={{ paddingLeft: `${props.leftPadding}px` }}>
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
				? item?.children?.map((item) => (
						<LayerRowItem item={item} leftPadding={props?.leftPadding + 20} />
					))
				: ''}
		</>
	);
}

function LayersList() {
	const [isPagesDroppedDown, setIsPagesDroppedDown] = useState(true);
	const [containerWidth, setContainerWidth] = useState(270);
	const [clicked, setClicked] = useState(false)

	const clickHandler = (e) => {
		setClicked(true)
		e.preventDefault()
		// window.addEventListener('mouseup', unclickHandler);
		// window.addEventListener('mousemove', moveHandler);
	};

	useEffect(() => {
		window.addEventListener('mouseup', unclickHandler);
		window.addEventListener('mousemove', moveHandler);
	}, [])

	const unclickHandler = (e) => {
		setClicked(false);
		// window.removeEventListener('mouseup', unclickHandler)
		// window.removeEventListener('mousemove', moveHandler)
	};

	const moveHandler = (e) => {
		if (clicked) {
			console.log(e)
			setContainerWidth(e.pageX);
		}
	};

	return (
		<ListContainer width={containerWidth}>
			<ListHeaderContainer>
				<SearchIconBox>
					<SearchIconButton>
						<SearchRounded sx={{ fontSize: 'inherit' }} />
					</SearchIconButton>
					<Ty active={true} hoverEffect={true} variant="layersListHeader">
						Layers
					</Ty>
					<Ty hoverEffect={true} variant="layersListHeader">
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
							You don't need any plans!
						</Ty2>
					</FreePagesContainer>
				</PageListContainer>
			)}
			<LayersListItemsContainer>
				{testLayersArr.map((item) => (
					<LayerRowItem item={item} leftPadding={0} />
				))}
			</LayersListItemsContainer>
			<ListContainerResizer
				id="list-container-resizer"
				draggable
				onMouseDown={clickHandler}
			/>
		</ListContainer>
	);
}

export default LayersList;
