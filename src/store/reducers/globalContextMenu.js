import { createSlice } from '@reduxjs/toolkit';

const globalContextMenuSlice = createSlice({
	name: 'globalContextMenu',
	initialState: {
		active: false,
		coordinates: null,
		menuContent: [],
	},
	reducers: {
		openContextMenu: (state, { payload: { event, menuContent } }) => {
			state.active = true;
			state.coordinates = { top: event.clientY, left: event.clientX };
			state.menuContent = menuContent;
		},
		closeContextMenu: (state) => {
			state.active = false;
			state.coordinates = null;
		},
	},
});

export default globalContextMenuSlice.reducer;
export const { openContextMenu, closeContextMenu } =
	globalContextMenuSlice.actions;
