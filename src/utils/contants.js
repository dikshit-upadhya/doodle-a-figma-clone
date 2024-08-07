import GROUP_ICON from '../assets/GROUP.svg';
import IMAGE_ICON from '../assets/IMAGE.svg';
import RECTANGLE_ICON from '../assets/RECTANGLE.svg';
import VECTOR_ICON from '../assets/VECTOR.svg';

export const DRAWER_WHITE_BORDER = '0.5px solid rgba(255,255,255, 0.1)';
export const HEX_REGEX = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
export const OPACITY_REGEX = /^(100|[1-9]?[0-9])$/;
export const INITIAL_COLOR = {
	hex: '#ffffffff',
	rgb: { r: 255, g: 255, b: 255, a: 1 },
};
export const layerTypeEnum = {
	GROUP: {
		type: 'GROUP',
		icon: GROUP_ICON,
	},
	VECTOR: { type: 'VECTOR', icon: VECTOR_ICON },
	IMAGE: { type: 'IMAGE', icon: IMAGE_ICON },
	RECTANGLE: { type: 'RECTANGLE', icon: RECTANGLE_ICON },
};
