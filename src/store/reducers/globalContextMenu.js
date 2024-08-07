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
			const rect = event.currentTarget?.getBoundingClientRect();
			if (menuContent && menuContent.length > 0) {
				state.active = true;
				switch (anchor) {
					case 'BOTTOM':
						state.coordinates = { top: `${rect.bottom}`, left: `${rect.left}` };
						break;
					case 'RIGHT':
						state.coordinates = { top: `${rect.top}`, left: `${rect.right}` };
						break;
					case 'LEFT':
						state.coordinates = { top: `${rect.top}`, left: `${rect.left}` };
						break;
					case 'BOTTOM-LEFT':
						state.coordinates = {
							top: `${rect.bottom}`,
							right: `${window.innerWidth - (rect.x + rect.width)}`,
						};
						break;
					default:
						state.coordinates = {
							top: `${event.clientY}`,
							left: `${event.clientX}`,
						};
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
