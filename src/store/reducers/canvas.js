import { createSlice } from '@reduxjs/toolkit';

const canvasSlice = createSlice({
	name: 'canvas',
	initialState: {
		scale: 1,
		transform: {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			e: 0,
			_e: 0,
			f: 0,
			_f: 0,
		},
		squares: [],
	},
	reducers: {
		setSquares: (state, { payload }) => {
			state.squares = payload;
		},
		setTransform: (state, { payload: { a, b, c, d, e, _e, f, _f } }) => {
			state.transform = { a, b, c, d, e, _e, f, _f };
		},
		resetTransform: (state) => {
			state.transform = {
				a: 1,
				b: 0,
				c: 0,
				d: 1,
				e: 0,
				_e: 0,
				f: 0,
				_f: 0,
			};
		},
		// translations (up, down, left, right)
		translateDown: (state) => {
			const canvasTransform = state.transform;
			state.transform = {
				a: canvasTransform.a,
				b: canvasTransform.b,
				c: canvasTransform.c,
				d: canvasTransform.d,
				e: canvasTransform.e,
				_e: canvasTransform._e,
				f: canvasTransform.f - 50,
				_f: canvasTransform._f - 50,
			};
		},
		translateUp: (state) => {
			const canvasTransform = state.transform;
			state.transform = {
				a: canvasTransform.a,
				b: canvasTransform.b,
				c: canvasTransform.c,
				d: canvasTransform.d,
				e: canvasTransform.e,
				_e: canvasTransform._e,
				f: canvasTransform.f + 50,
				_f: canvasTransform._f + 50,
			};
		},
		translateRight: (state) => {
			const canvasTransform = state.transform;
			state.transform = {
				a: canvasTransform.a,
				b: canvasTransform.b,
				c: canvasTransform.c,
				d: canvasTransform.d,
				e: canvasTransform.e - 50,
				_e: canvasTransform._e - 50,
				f: canvasTransform.f,
				_f: canvasTransform._f,
			};
		},
		translateLeft: (state) => {
			const canvasTransform = state.transform;
			state.transform = {
				a: canvasTransform.a,
				b: canvasTransform.b,
				c: canvasTransform.c,
				d: canvasTransform.d,
				e: canvasTransform.e + 50,
				_e: canvasTransform._e + 50,
				f: canvasTransform.f,
				_f: canvasTransform._f,
			};
		},

		// scaling (zoom in, zoom out)
		zoomIn: (state, { payload: { event } }) => {
			const scaleFactor = state.scale + 0.1;
			state.scale = scaleFactor;
			const adjX = event.clientX;
			const adjY = event.clientY;
			state.transform = {
				a: scaleFactor,
				b: 0,
				c: 0,
				d: scaleFactor,
				// e: -(event.clientX * (scaleFactor - 1)),
				e: -(adjX - adjX / scaleFactor) + state.transform._e / scaleFactor,
				_e: state.transform._e,
				// f: -(event.clientY * (scaleFactor - 1)),
				f: -(adjY - adjY / scaleFactor) + state.transform._f / scaleFactor,
				_f: state.transform._f,
			};
		},
		zoomOut: (state, { payload: { event } }) => {
			const scaleFactor = state.scale - 0.1;
			state.scale = scaleFactor;
			const adjX = event.clientX;
			const adjY = event.clientY;
			state.transform = {
				a: scaleFactor,
				b: 0,
				c: 0,
				d: scaleFactor,
				// e: -(event.clientX * (scaleFactor - 1)),
				e: -(adjX - adjX / scaleFactor) + state.transform._e / scaleFactor,
				_e: state.transform._e,
				// f: -(event.clientY * (scaleFactor - 1)),
				f: -(adjY - adjY / scaleFactor) + state.transform._f / scaleFactor,
				_f: state.transform._f,
			};
		},
	},
});

export default canvasSlice.reducer;
export const {
	setSquares,
	setTransform,
	translateDown,
	translateUp,
	translateLeft,
	translateRight,
	resetTransform,
	zoomIn,
	zoomOut,
} = canvasSlice.actions;
