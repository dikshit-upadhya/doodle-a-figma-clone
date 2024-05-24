import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './reducers/pages';
import globalContextMenuReducer from './reducers/globalContextMenu';
import canvasReducer from './reducers/canvas';

const store = configureStore({
	reducer: {
		pages: pagesReducer,
		globalContextMenu: globalContextMenuReducer,
		canvas: canvasReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['globalContextMenu/openContextMenu'],
				// ignoredActionPaths: ['payload.event'],
				ignoredPaths: ['globalContextMenu'],
			},
		}),
});

export default store;
