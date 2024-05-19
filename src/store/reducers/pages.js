import { v4 as uuid } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import { getCommonColorObj } from '../../utils/colorConvertor';

const createNewPageObj = (pages, color = '#ffffff') => ({
	id: uuid(),
	name: `Page ${pages.length + 1}`,
	pageColor: getCommonColorObj(color),
});

const initiallyActivePage = createNewPageObj([], '#87CEEB33');

const pageSlice = createSlice({
	name: 'pages',
	initialState: {
		activePage: initiallyActivePage,
		pages: [initiallyActivePage],
	},
	reducers: {
		addPage: (state) => {
			const newPage = createNewPageObj(state.pages);
			state.pages.push(newPage);
			state.activePage = newPage;
		},
		deletePage: (state, { payload: { pageId } }) => {
			state.pages = state.pages.filter((pageEle) => pageEle.id !== pageId);
			if (state.activePage.id === pageId) {
				if (state.pages.length > 1) {
					state.activePage = state.pages[0];
				}
			}
		},
		setActivePage: (state, { payload: { pageId } }) => {
			const pageWithPageId = state.pages.find((i) => i.id === pageId);
			state.activePage = pageWithPageId;
		},
		setPageColor: (state, { payload }) => {
			state.activePage.pageColor = payload;
			state.pages = state.pages.map((i) => {
				if (i.id === state.activePage.id)
					return {
						...i,
						pageColor: payload,
					};
				return i;
			});
		},
	},
});

export default pageSlice.reducer;
export const { addPage, deletePage, setActivePage, setPageColor } =
	pageSlice.actions;
