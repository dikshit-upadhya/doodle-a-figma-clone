import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { layerTypeEnum } from '../utils/contants';

const useLayers = () => {
	const { layers } = useSelector((state) => state.layers);

	const buildHierarchy = (parentId = null) => {
		const reqd = layers
			.filter((item) => item.parentId === parentId)
			.map((item) => ({
				...item,
				children: buildHierarchy(item.id),
			}));
		return reqd;
	};

	const layersHierarchy = useMemo(() => buildHierarchy(), [layers]);

	const seggregatedLayers = useMemo(() => {
		const rectangles = layers.filter(
			(i) => i.type === layerTypeEnum.RECTANGLE.type
		);
		return {
			rectangles,
		};
	}, [layers]);

	return [layersHierarchy, layers, seggregatedLayers];
};

export default useLayers;
