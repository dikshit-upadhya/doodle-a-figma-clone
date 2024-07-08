export default (ctx) => {
	// Reset transformation to draw axes correctly
	// ctx.setTransform(1, 0, 0, 1, 0, 0);

	// Draw Y-axis (left border)
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, 700);
	ctx.strokeStyle = 'black';
	ctx.stroke();

	// Draw X-axis (top border)
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(1400, 0);
	ctx.strokeStyle = 'black';
	ctx.stroke();

	// Draw coordinate points on Y-axis
	for (let i = 0; i <= 10000; i += 50) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(5, i);
		ctx.stroke();
		ctx.fillStyle = 'black';
		ctx.fillText(i, 10, i + 3);
	}

	// Draw coordinate points on X-axis
	for (let i = 0; i <= 10000; i += 50) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, 5);
		ctx.stroke();
		ctx.fillStyle = 'black';
		ctx.fillText(i, i - 10, 15);
	}

	// Reapply transformation matrix
	// ctx.setTransform(1, 0, 0, 1, canvasTransform.e, canvasTransform.f);
};
