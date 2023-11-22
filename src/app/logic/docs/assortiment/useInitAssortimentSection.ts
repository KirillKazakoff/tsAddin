/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { createAssortiment } from './createAssortiment';
import { groupAssortiment } from './group/groupAssortiment';
import { groupSamples } from './group/groupSamples';
import { createSample } from './createSample';
import { AssortimentObjT } from './initAssortimentObj';

export const useInitAssortimentSection = () => {
    const { exportStorageT, exportT } = tablesStore;
    // first export rows then storage order!
    const rows = [...exportT, ...exportStorageT];

    const assortiment = groupAssortiment(_.cloneDeep(rows));
    const samples = groupSamples(_.cloneDeep(rows));

    const onLoad = {
        assortiment: async () => createAssortiment(assortiment),
        sample: async (sample: AssortimentObjT) => createSample(sample),
    };

    const onLoadAll = async () => {
        await Promise.all(samples.map((sample) => onLoad.sample(sample)));
    };

    return { onLoad, onLoadAll, samples };
};
