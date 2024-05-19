import store from '../../store';
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
