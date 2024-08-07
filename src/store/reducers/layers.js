import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { testLayersArr2 } from '../../testCode/testConstants';
import { layerTypeEnum } from '../../utils/contants';

const layerSlice = createSlice({
	name: 'layers',
	initialState: {
		layers: testLayersArr2,
	},
	reducers: {
		setLayers: (state, action) => {
			state.layers = action.payload;
		},
		addLayer: (state, { payload }) => {
			state.layers = [...state.layers, payload];
		},
		addRectangle: (state, { payload }) => {
			state.layers = [
				...state.layers,
				{
					name: 'Rectangle',
					id: uuid(),
					type: layerTypeEnum.RECTANGLE.type,
					parentId: null,
					children: [],
					prop: payload,
				},
			];
		},
	},
});

export default layerSlice.reducer;
export const { setLayers, addLayer, addRectangle } = layerSlice.actions;
