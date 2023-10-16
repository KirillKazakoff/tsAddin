/* eslint-disable import/no-extraneous-dependencies */
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { ExportRowT } from '../../../types/typesTables';
import { groupByBl } from '../exportContract/groupBy/groupByBl';
import { BlGroupT } from '../exportContract/groupBy/initBlGroup';
import { createBL } from './createBl';

export const useInitBlSection = () => {
    const table = exportContractStore.currentTable;

    const blGroupsArr = Object.values(groupByBl(table));
    const onLoad = async (group: BlGroupT<ExportRowT>) => createBL(group);

    const onLoadAll = async () => {
        await Promise.all(blGroupsArr.map((group) => onLoad(group)));
    };

    return {
        onLoad,
        onLoadAll,
        blGroupsArr,
    };
};
