import React from 'react';
import { ButtonBase, Typography, styled } from '@mui/material';
import PropTypes from 'prop-types';

const StyledButton = styled(ButtonBase, {
	shouldForwardProp: (props) => !['_nonrequiredpropshere'].includes(props),
})(({ theme }) => ({
	background: theme.palette.brightBlue,
	padding: '8px 10px',
	borderRadius: '8px',
}));

function BrightBlueButton({ title, onClick, disabled }) {
	return (
		<StyledButton onClick={onClick} disabled={disabled}>
			<Typography sx={{ color: 'white' }} variant="buttonText">
				{title}
			</Typography>
		</StyledButton>
	);
}

BrightBlueButton.propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};

BrightBlueButton.defaultProps = {
	onClick: () => {},
	disabled: false,
};

export default BrightBlueButton;
