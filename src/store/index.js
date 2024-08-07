import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './reducers/pages';
import globalContextMenuReducer from './reducers/globalContextMenu';
import canvasReducer from './reducers/canvas';
import layersReducer from './reducers/layers';

const store = configureStore({
	reducer: {
		pages: pagesReducer,
		globalContextMenu: globalContextMenuReducer,
		canvas: canvasReducer,
		layers: layersReducer,
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
