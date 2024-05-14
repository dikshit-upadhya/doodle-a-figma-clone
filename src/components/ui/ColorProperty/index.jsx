import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Popover } from '@mui/material';
import { SketchPicker } from 'react-color';
import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';
import { HEX_REGEX, OPACITY_REGEX } from '../../../utils/contants';
import {
	ColorIndicator,
	ColorValue,
	PropertyContainer,
	PropertyDetails,
} from '../../atomic/Property';

function ColorPropertyComponent(props) {
	// the color and set color property from the props handles the whole color management
	const { sx, color, setColor } = props;

	// the rest of the code below is component specific and doesn't require any parent component intervention
	const [colorPickerAnchor, setColorPickerAnchor] = useState();
	const colorPickerOpen = Boolean(colorPickerAnchor);
	const anchorId = colorPickerOpen ? 'COLOR_PICKER_POPOVER_ID' : undefined;
	const [tempColor, setTempColor] = useState(color);
	const [colorPropertyValue, setColorPropertyValue] = useState(``);
	const [opacityPropertyValue, setOpacityPropertyValue] = useState(``);

	useEffect(() => {
		if (color.hex !== tempColor.hex) {
			setTempColor(color);
		}
	}, [color]);

	useEffect(() => {
		setColorPropertyValue(color.hex?.replace('#', '').toUpperCase());
		setOpacityPropertyValue(`${color.rgb.a * 100}`);
	}, [tempColor, color]);

	const handleOpenColorPicker = (e) => {
		setColorPickerAnchor(e.currentTarget);
	};

	const handleColorInputComplete = () => {
		if (HEX_REGEX.test(colorPropertyValue)) {
			const h2r = hexRgb(colorPropertyValue);
			const reqdColorObj = {
				hex: colorPropertyValue.toUpperCase(),
				rgb: {
					r: h2r.red,
					g: h2r.green,
					b: h2r.blue,
					a: h2r.alpha,
				},
			};
			setTempColor(reqdColorObj);
			setColor(reqdColorObj);
			setColorPropertyValue(colorPropertyValue.toUpperCase());
		} else {
			setColorPropertyValue(color.hex?.replace('#', '').toUpperCase());
		}
	};

	const handleOpacityInputComplete = () => {
		if (OPACITY_REGEX.test(opacityPropertyValue)) {
			const reqdColorObj = {
				hex: `#${rgbHex(
					color.rgb.r,
					color.rgb.g,
					color.rgb.b,
					opacityPropertyValue / 100
				)}`,
				rgb: {
					r: color.rgb.r,
					g: color.rgb.g,
					b: color.rgb.b,
					a: opacityPropertyValue / 100,
				},
			};
			setTempColor(reqdColorObj);
			setColor(reqdColorObj);
		} else {
			setOpacityPropertyValue(color.rgb.a * 100);
		}
	};

	return (
		<>
			<Popover
				id={anchorId}
				open={colorPickerOpen}
				anchorEl={colorPickerAnchor}
				onClose={() => {
					setColorPickerAnchor(null);
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box>
					<SketchPicker
						color={tempColor}
						onChange={(newColor) => {
							setTempColor(newColor.rgb);
						}}
						onChangeComplete={(newColor) => {
							setColor({
								rgb: newColor.rgb,
								hex: `#${rgbHex(
									newColor.rgb.r,
									newColor.rgb.g,
									newColor.rgb.b,
									newColor.rgb.a
								)}`,
							});
						}}
						presetColors={[]}
					/>
				</Box>
			</Popover>
			<PropertyContainer aria-describedby={anchorId} sx={sx}>
				<PropertyDetails>
					<ColorIndicator
						color={`rgba(${color?.rgb.r}, ${color?.rgb.g}, ${color?.rgb.b}, ${color?.rgb.a})`}
						onClick={handleOpenColorPicker}
					/>
					<ColorValue
						onFocus={(e) => e.target.select()}
						value={colorPropertyValue}
						onChange={(e) => {
							setColorPropertyValue(e.target.value);
						}}
						onBlur={handleColorInputComplete}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleColorInputComplete();
							}
						}}
					/>
				</PropertyDetails>
				<PropertyDetails>
					<ColorValue
						onFocus={(e) => e.target.select()}
						sx={{ width: '34px' }}
						value={opacityPropertyValue}
						onChange={(e) => {
							setOpacityPropertyValue(e.target.value);
						}}
						endAdornment="%"
						onBlur={handleOpacityInputComplete}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleOpacityInputComplete();
							}
						}}
					/>
				</PropertyDetails>
			</PropertyContainer>
		</>
	);
}

ColorPropertyComponent.propTypes = {
	sx: PropTypes.shape({}).isRequired,
	color: PropTypes.shape({
		hex: PropTypes.string.isRequired,
		rgb: PropTypes.shape({
			r: PropTypes.number.isRequired,
			g: PropTypes.number.isRequired,
			b: PropTypes.number.isRequired,
			a: PropTypes.number.isRequired,
		}).isRequired,
	}).isRequired,
	setColor: PropTypes.func.isRequired,
};

export default ColorPropertyComponent;
