import store from '../../store';
import {
	zoomInCenter,
	zoomOutCenter,
	zoomToFactor,
} from '../../store/reducers/canvas';
import { deletePage } from '../../store/reducers/pages';
import basicMenuStruct from './menuStructure';

export const getMenuForPage = (pageId) => {
	const state = store.getState();
	const deleteDisabled = state.pages.pages.length === 1;

	return [
		basicMenuStruct({ title: 'Rename' }),
		basicMenuStruct({ title: 'Duplicate', breakAfter: true }),
		basicMenuStruct({
			title: 'Delete',
			disabled: deleteDisabled,
			onClick: () => {
				store.dispatch(deletePage({ pageId }));
			},
		}),
	];
};

export const getMenuForMainMenu = () => [
	basicMenuStruct({ title: 'Back To Files' }),
	basicMenuStruct({
		title: 'File',
		children: [
			basicMenuStruct({ title: 'New _name_ File' }),
			basicMenuStruct({ title: 'Place Image' }),
			basicMenuStruct({ title: 'Save Local Copy' }),
			basicMenuStruct({ title: 'Export' }),
		],
	}),
	basicMenuStruct({
		title: 'Edit',
		children: [
			basicMenuStruct({ title: 'Undo' }),
			basicMenuStruct({ title: 'Redo' }),
			basicMenuStruct({ title: 'Import Image' }),
		],
	}),
];

export const getMenuForCanvas = () => [
	basicMenuStruct({ title: 'Show/Hide UI' }),
	basicMenuStruct({ title: 'Show/Hide Comments', breakAfter: true }),
	basicMenuStruct({ title: 'Copy', disabled: true }),
	basicMenuStruct({ title: 'Paste Here', disabled: true }),
];

export const getMenuForFrame = () => [
	basicMenuStruct({ title: 'Frame' }),
	basicMenuStruct({ title: 'Section' }),
];
export const getMenuForRectangle = () => [
	basicMenuStruct({ title: 'Rectangle' }),
	basicMenuStruct({ title: 'Line' }),
	basicMenuStruct({ title: 'Arrow' }),
	basicMenuStruct({ title: 'Eclipse' }),
	basicMenuStruct({ title: 'Place Image' }),
];

export const getMenuForPen = () => [
	basicMenuStruct({ title: 'Pen' }),
	basicMenuStruct({ title: 'Pencil' }),
];

export const getMenuForZoomMenu = () => [
	basicMenuStruct({
		title: 'Zoom In',
		onClick: () => {
			store.dispatch(zoomInCenter());
		},
		quitOnClick: false,
	}),
	basicMenuStruct({
		title: 'Zoom Out',
		onClick: () => {
			store.dispatch(zoomOutCenter());
		},
		quitOnClick: false,
	}),
	basicMenuStruct({
		title: 'Zoom to 1000%',
		onClick: () => {
			store.dispatch(zoomToFactor({ scaleFactor: 10 }));
		},
	}),
	basicMenuStruct({
		title: 'Zoom to 500%',
		onClick: () => {
			store.dispatch(zoomToFactor({ scaleFactor: 5 }));
		},
	}),
	basicMenuStruct({
		title: 'Zoom to 200%',
		onClick: () => {
			store.dispatch(zoomToFactor({ scaleFactor: 2 }));
		},
		breakAfter: true,
	}),
	basicMenuStruct({
		title: 'Zoom to 100%',
		onClick: () => {
			store.dispatch(zoomToFactor({ scaleFactor: 1 }));
		},
		breakAfter: true,
	}),
	basicMenuStruct({
		title: 'Zoom to 50%',
		onClick: () => {
			store.dispatch(zoomToFactor({ scaleFactor: 0.5 }));
		},
	}),
	basicMenuStruct({
		title: 'Zoom to 10%',
		onClick: () => {
			store.dispatch(zoomToFactor({ scaleFactor: 0.1 }));
		},
	}),
];
