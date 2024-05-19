import { createSlice } from '@reduxjs/toolkit';

const globalContextMenuSlice = createSlice({
	name: 'globalContextMenu',
	initialState: {
		active: false,
		coordinates: null,
		menuContent: [],
	},
	reducers: {
		openContextMenu: (state, { payload: { event, menuContent, anchor } }) => {
			if (menuContent && menuContent.length > 0) {
				state.active = true;
				switch (anchor) {
					case 'BOTTOM':
						state.coordinates = { top: event.clientY, left: event.clientX };
						break;
					default:
						state.coordinates = { top: event.clientY, left: event.clientX };
						break;
				}
				state.menuContent = menuContent;
			}
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
