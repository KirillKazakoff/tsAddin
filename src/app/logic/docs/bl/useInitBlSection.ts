/* eslint-disable import/no-extraneous-dependencies */
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { BlGroupT } from '../../../types/typesContract';
import { tryCatch } from '../../excel/utils/tryCatch';
import { groupByBl } from '../exportContract/groupBy/groupByBl';
import { createBL } from './createBl';

const initBlSection = () => {
    const table = exportContractStore.getCurrentTable();

    const blGroupsArr = groupByBl(table);
    const onLoad = async (group: BlGroupT) => createBL(group);

    const onLoadAll = async () => {
        await Promise.all(blGroupsArr.map((group) => onLoad(group)));
    };

    return {
        onLoad,
        onLoadAll,
        blGroupsArr,
    };
};

export const useInitBlSection = () => {
    return tryCatch<typeof initBlSection>(initBlSection);
};
