import { createSlice } from '@reduxjs/toolkit';

const frameSlice = createSlice({
	name: 'frames',
	initialState: {
		frames: [],
	},
	reducers: {
		setFrames: (state, action) => {
			state.frames = action.payload;
		},
	},
});

export default frameSlice.reducer;
export const { setFrames } = frameSlice.actions;
