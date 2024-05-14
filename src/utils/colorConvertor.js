export function convertColor(colorString) {
	let rgba;
	let hex;

	// Function to convert HEX to RGBA
	const hexToRgba = (hexString) => {
		const bigint = parseInt(hexString.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		const a = 1;
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	};

	// Function to convert HSL to RGBA
	const hslToRgba = (h, s, l, a = 1) => {
		const c = (1 - Math.abs(2 * l - 1)) * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = l - c / 2;
		let r;
		let g;
		let b;
		if (h >= 0 && h < 60) {
			[r, g, b] = [c, x, 0];
		} else if (h >= 60 && h < 120) {
			[r, g, b] = [x, c, 0];
		} else if (h >= 120 && h < 180) {
			[r, g, b] = [0, c, x];
		} else if (h >= 180 && h < 240) {
			[r, g, b] = [0, x, c];
		} else if (h >= 240 && h < 300) {
			[r, g, b] = [x, 0, c];
		} else {
			[r, g, b] = [c, 0, x];
		}
		return `rgba(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)}, ${a})`;
	};

	// Parse the color string
	const colorArr = colorString.match(
		/(rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\))|(rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(\d*\.?\d+)\s*\))|(#[0-9A-Fa-f]{6})|(#[0-9A-Fa-f]{3})|(hsl\(\s*\d+\s*,\s*\d+\%\s*,\s*\d+\%\s*\))|(hsla\(\s*\d+\s*,\s*\d+\%\s*,\s*\d+\%\s*,\s*(\d*\.?\d+)\s*\))/
	);

	if (!colorArr) {
		// Invalid color string
		return null;
	}

	const colorType = colorArr.findIndex((val) => val !== undefined);

	const hslValues = colorArr[0].match(/\d+/g);
	const hslA = parseFloat(hslValues[2]) / 100;
	const hslaValues = colorArr[0].match(/\d+/g);
	const hslaA = parseFloat(hslaValues[3]);
	switch (colorType) {
		case 1: // RGB
			rgba = colorArr[0].replace('rgb', 'rgba').replace(')', ', 1)');
			break;
		case 2: // RGBA
			[rgba] = colorArr;
			break;
		case 3: // HEX (6-digit)
			[hex] = colorArr;
			rgba = hexToRgba(hex);
			break;
		case 4: // HEX (3-digit)
			[hex] = colorArr;
			hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
			rgba = hexToRgba(hex);
			break;
		case 5: // HSL
			rgba = hslToRgba(hslValues[0], hslValues[1] / 100, hslA);
			break;
		case 6: // HSLA
			rgba = hslToRgba(
				hslaValues[0],
				hslaValues[1] / 100,
				hslaValues[2] / 100,
				hslaA
			);
			break;
		default:
			break;
	}

	return { hex, rgba };
}

export const something = [];
