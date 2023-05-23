/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { createAssortiment } from './createAssortiment';
import { groupAssortiment } from './group/groupAssortiment';
import { AssortimentT } from '../../../types/typesAssortiment';
import { groupSamples } from './group/groupSamples';
import { createSample } from './createSample';

export const useInitAssortimentSection = () => {
    const { exportStorageT, exportT } = tablesStore;
    const rows = _.cloneDeep([...exportStorageT, ...exportT]);

    const assortiment = groupAssortiment(rows);
    const samplesArr = Object.values(groupSamples(rows));

    const onLoad = {
        assortiment: async () => createAssortiment(assortiment),
        sample: async (sample: AssortimentT) => createSample(sample),
    };

    const onLoadAll = async () => {
        await Promise.all(samplesArr.map((sample) => onLoad.sample(sample)));
    };

    return { onLoad, onLoadAll, samplesArr };
};
