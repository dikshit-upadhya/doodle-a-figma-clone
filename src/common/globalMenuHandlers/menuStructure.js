import { v4 as uuid } from 'uuid';

export default (obj) => {
	if (!obj.title) {
		throw new Error('Title is required**');
	}
	return {
		id: uuid(),
		title: obj.title,
		iconBefore: obj.iconBefore ?? '',
		breakAfter: obj.breakAfter ?? false,
		disabled: obj.disabled ?? false,
		onClick: obj.onClick ?? (() => {}),
		children: obj.children ?? [],
		quitOnClick: obj.quitOnClick ?? true,
	};
};
