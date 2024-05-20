import React from 'react';
import { Avatar, styled } from '@mui/material';
import PropTypes from 'prop-types';

const StyledAvatar = styled(Avatar)(() => ({
	background: 'yellow',
	height: '28px',
	width: '28px',
	color: 'black',
	fontSize: '14px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

function PersonAvatar({ content }) {
	return <StyledAvatar>{content.content}</StyledAvatar>;
}

PersonAvatar.propTypes = {
	content: PropTypes.shape({
		type: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}).isRequired,
};

export default PersonAvatar;
