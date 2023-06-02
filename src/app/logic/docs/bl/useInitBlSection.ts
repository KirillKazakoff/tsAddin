/* eslint-disable import/no-extraneous-dependencies */
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { BlGroupT } from '../../../types/typesContract';
import { groupByBl } from '../exportContract/groupBy/groupByBl';
import { createBL } from './createBl';

export const useInitBlSection = () => {
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
