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
			f: 0,
		},
	},
	reducers: {
		setTransform: (state, { payload: { a, b, c, d, e, f } }) => {
			state.transform = { a, b, c, d, e, f };
		},
		translateDown: (state) => {
			const canvasTransform = state.transform;
			state.transform = {
				a: canvasTransform.a,
				b: canvasTransform.b,
				c: canvasTransform.c,
				d: canvasTransform.d,
				e: canvasTransform.e,
				f: canvasTransform.f - 50,
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
				f: canvasTransform.f + 50,
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
				f: canvasTransform.f,
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
				f: canvasTransform.f,
			};
		},
		resetTransform: (state) => {
			state.transform = {
				a: 1,
				b: 0,
				c: 0,
				d: 1,
				e: 0,
				f: 0,
			};
		},
	},
});

export default canvasSlice.reducer;
export const {
	setTransform,
	translateDown,
	translateUp,
	translateLeft,
	translateRight,
	resetTransform,
} = canvasSlice.actions;
