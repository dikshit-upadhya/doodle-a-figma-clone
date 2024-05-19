import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './reducers/pages';
import globalContextMenuReducer from './reducers/globalContextMenu';

const store = configureStore({
	reducer: {
		pages: pagesReducer,
		globalContextMenu: globalContextMenuReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['globalContextMenu/openContextMenu'],
				// ignoredActionPaths: ['payload.event'],
				// ignoredPaths: ['payload.event'],
			},
		}),
});

export default store;
