import { v4 as uuid } from 'uuid';
import GROUP_ICON from '../assets/GROUP.svg';
import IMAGE_ICON from '../assets/IMAGE.svg';
import RECTANGLE_ICON from '../assets/RECTANGLE.svg';
import VECTOR_ICON from '../assets/VECTOR.svg';

export const layerTypeEnum = {
	GROUP: {
		type: 'GROUP',
		icon: GROUP_ICON,
	},
	VECTOR: { type: 'VECTOR', icon: VECTOR_ICON },
	IMAGE: { type: 'IMAGE', icon: IMAGE_ICON },
	RECTANGLE: { type: 'RECTANGLE', icon: RECTANGLE_ICON },
};

export const testLayersArr2 = [
	{
		name: 'Rectangle 1',
		id: uuid(),
		type: layerTypeEnum.RECTANGLE.type,
		parentId: null,
		children: [],
		prop: {
			x: window.innerWidth / 2 - 50,
			y: window.innerHeight / 2 - 50,
			width: 100,
			height: 100,
			controlPoints: [],
			controlPoints2: [],
			background: 'red',
			stroke: 'black',
			zIndex: 1,
		},
	},
	{
		name: 'Rectangle 1',
		id: uuid(),
		type: layerTypeEnum.RECTANGLE.type,
		parentId: null,
		children: [],
		prop: {
			x: window.innerWidth / 2 - 250,
			y: window.innerHeight / 2 - 250,
			width: 100,
			height: 100,
			controlPoints: [],
			controlPoints2: [],
			background: 'blue',
			stroke: 'red',
			zIndex: 2,
		},
	},
];

export const testLayersArr = [
	{
		name: 'Rectangle 121',
		id: uuid(),
		type: layerTypeEnum.RECTANGLE,
		parentId: null,
		children: [
			{
				name: 'Rectangle 334',
				type: layerTypeEnum.RECTANGLE,
			},
			{
				name: 'Group 334',
				type: layerTypeEnum.RECTANGLE,
				children: [
					{
						name: 'Group 554',
						type: layerTypeEnum.GROUP,
					},
					{
						name: 'Rectangle 523',
						type: layerTypeEnum.RECTANGLE,
						children: [
							{
								name: 'Vector 32323',
								type: layerTypeEnum.VECTOR,
								children: [
									{
										name: 'Vector 32323',
										type: layerTypeEnum.VECTOR,
										children: [
											{
												name: 'Vector 32323',
												type: layerTypeEnum.VECTOR,
												children: [
													{
														name: 'Vector 32323',
														type: layerTypeEnum.VECTOR,
														children: [
															{
																name: 'Vector 32323',
																type: layerTypeEnum.VECTOR,
																children: [
																	{
																		name: 'Vector 32323',
																		type: layerTypeEnum.VECTOR,
																		children: [
																			{
																				name: 'Vector 32323',
																				type: layerTypeEnum.VECTOR,
																				children: [
																					{
																						name: 'Vector 32323',
																						type: layerTypeEnum.VECTOR,
																						children: [
																							{
																								name: 'Vector 32323',
																								type: layerTypeEnum.VECTOR,
																							},
																						],
																					},
																				],
																			},
																		],
																	},
																],
															},
														],
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				name: 'Vector 334',
				type: layerTypeEnum.VECTOR,
			},
		],
	},
	{
		name: 'Rectangle 131',
		type: layerTypeEnum.RECTANGLE,
	},
	{
		name: 'Group 334',
		type: layerTypeEnum.GROUP,
	},
	{
		name: 'Image 345',
		type: layerTypeEnum.IMAGE,
	},
];
