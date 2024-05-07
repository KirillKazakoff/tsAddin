/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { groupAssortiment } from './group/groupAssortiment';
import { groupSamples } from './group/groupSamples';
import { AssortimentObjT } from './initAssortimentObj';
import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';
import { initAssortiment } from './initAssortiment';

export const useInitAssortimentSection = () => {
    const { exportStorageT, exportT } = tablesStore;
    // first export rows then storage order!
    const rows = [...exportT, ...exportStorageT];

    const assortiment = groupAssortiment(_.cloneDeep(rows));
    const samples = groupSamples(_.cloneDeep(rows));

    const onLoad = {
        assortiment: async () => {
            await createDoc({
                fileName: `Assortment ${assortiment.record.transport.eng.name}`,
                initTmpsCb: (book) => {
                    const ws = book.addWorksheet('assortiment');
                    initAssortiment(assortiment, ws);
                },
            });
        },
        sample: async (sample: AssortimentObjT) => {
            await createDoc({
                fileName: `Sample plan ${sample.record.consignee.code}`,
                initTmpsCb: (book) => {
                    const ws = book.addWorksheet('sample');
                    initAssortiment(sample, ws);
                },
            });
        },
    };

    const onLoadAll = async () => {
        await Promise.all(samples.map((sample) => onLoad.sample(sample)));
    };

    return { onLoad, onLoadAll, samples };
};
