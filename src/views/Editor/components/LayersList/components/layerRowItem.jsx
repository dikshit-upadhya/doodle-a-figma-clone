import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconWrapper, LayerItem, LayerTypeIcon, Ty2 } from '../styled';

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
							key={layerRowItem.name}
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
		children: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
};

export default LayerRowItem;
