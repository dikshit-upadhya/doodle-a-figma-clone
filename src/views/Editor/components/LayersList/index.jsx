import React, { useEffect, useState } from 'react';
import {
	AddRounded,
	CheckRounded,
	KeyboardArrowDown,
	KeyboardArrowUp,
	SearchRounded,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	FreePagesContainer,
	IconWrapper,
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
import {
	addPage,
	deletePage,
	setActivePage,
} from '../../../../store/reducers/pages';
import LayerRowItem from './components/layerRowItem';
import { openContextMenu } from '../../../../store/reducers/globalContextMenu';

function LayersList() {
	const dispatch = useDispatch();
	const { pages, activePage } = useSelector((state) => state.pages);

	// local states
	const [isPagesDroppedDown, setIsPagesDroppedDown] = useState(true);
	const [containerWidth, setContainerWidth] = useState(270);
	const [clicked, setClicked] = useState(false);

	// local methods
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

	const constructContextualMenuContent = (pageId) => [
		{ title: 'Rename' },
		{ title: 'Duplicate', breakAfter: true },
		{
			title: 'Delete',
			onClick: () => {
				dispatch(deletePage({ pageId }));
			},
		},
	];

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
					<Ty variant="layersListHeader">{activePage.name}</Ty>
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
							<SearchIconButton
								onClick={() => {
									dispatch(addPage());
								}}
							>
								<AddRounded sx={{ fontSize: '18px' }} />
							</SearchIconButton>
						</Box>
					</PageListContainerHeader>
					<PageListItemsContainer>
						{pages?.map((item) => (
							<PageListItem
								onContextMenu={(event) => {
									dispatch(
										openContextMenu({
											event,
											menuContent: constructContextualMenuContent(item.id),
										})
									);
								}}
								onClick={() => {
									dispatch(setActivePage({ pageId: item.id }));
								}}
								key={item.name}
							>
								<IconWrapper>
									{item.id === activePage.id && (
										<CheckRounded sx={{ fontSize: '14px', color: 'white' }} />
									)}
								</IconWrapper>
								<Ty variant="layersListTitle" sx={{ flex: 1 }}>
									{item.name}
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
					<LayerRowItem key={item.name} item={item} leftPadding={0} />
				))}
			</LayersListItemsContainer>
			<ListContainerResizer onMouseDown={clickHandler} />
		</ListContainer>
	);
}

export default LayersList;
