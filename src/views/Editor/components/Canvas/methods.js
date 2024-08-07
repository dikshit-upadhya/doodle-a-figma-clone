export const drawRectangles = (arr, context) => {
	arr.forEach((layerItem) => {
		const prop = layerItem.prop;
		context.fillStyle = prop.background;
		context.fillRect(prop.x, prop.y, prop.width, prop.height);
		context.strokeStyle = prop.stroke;
		context.strokeRect(prop.x, prop.y, prop.width, prop.height);
		context.strokeStyle = 'blue';
		context.fillStyle = 'white';
		prop.controlPoints?.forEach((point) => {
			context.beginPath();
			context.moveTo(point.x, point.y);
			context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
			context.stroke();
			context.fill();
			context.closePath();
		});
	});
};

export const something = () => {};
