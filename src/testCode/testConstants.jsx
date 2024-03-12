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

export const testLayersArr = [
	{
		name: 'Rectangle 121',
		type: layerTypeEnum.RECTANGLE,
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
