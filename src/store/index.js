import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './reducers/pages';
import globalContextMenuReducer from './reducers/globalContextMenu';

const store = configureStore({
	reducer: {
		pages: pagesReducer,
		globalContextMenu: globalContextMenuReducer,
	},
});

export default store;
