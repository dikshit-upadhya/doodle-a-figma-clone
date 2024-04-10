import React from 'react';
import PropTypes from 'prop-types';
import {
	ColorProperty,
	ColorValue,
	PropertyContainer,
	PropertyDetails,
} from '../../atomic/Property';

function ColorPropertyComponent(props) {
	const { sx } = props;

	return (
		<PropertyContainer sx={sx}>
			<PropertyDetails>
				<ColorProperty />
				<ColorValue onFocus={(e) => e.target.select()} defaultValue="00FB32" />
			</PropertyDetails>
			<PropertyDetails hideLeftBorder>
				<ColorValue
					onFocus={(e) => e.target.select()}
					sx={{ width: '34px' }}
					defaultValue="100%"
				/>
			</PropertyDetails>
		</PropertyContainer>
	);
}

ColorPropertyComponent.propTypes = {
	sx: PropTypes.shape({}),
};

ColorPropertyComponent.defaultProps = {
	sx: {},
};

export default ColorPropertyComponent;
