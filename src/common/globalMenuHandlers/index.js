import store from '../../store';
import { deletePage } from '../../store/reducers/pages';

export const getMenuForPage = (pageId) => {
	const state = store.getState();
	const deleteDisabled = state.pages.pages.length === 1;

	return [
		{ title: 'Rename' },
		{ title: 'Duplicate', breakAfter: true },
		{
			title: 'Delete',
			disabled: deleteDisabled,
			onClick: () => {
				store.dispatch(deletePage({ pageId }));
			},
		},
	];
};

export const getMenuForMainMenu = () => [
	{ title: 'Back To Files' },
	{
		title: 'File',
		children: [
			{ title: 'New _name_ File' },
			{ title: 'Place Image' },
			{ title: 'Save Local Copy' },
			{ title: 'Export' },
		],
	},
	{
		title: 'Edit',
		children: [{ title: 'Undo' }, { title: 'Redo' }, { title: 'Import Image' }],
	},
];
