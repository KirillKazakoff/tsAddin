/* eslint-disable import/no-extraneous-dependencies */
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import tablesStore from '../../../stores/tablesStore/tablesStore';
import { BlGroupT } from '../../../types/typesContract';
import { ExportRowT } from '../../../types/typesTables';
import { groupByBl } from '../exportContract/groupBy/groupByBl';
import { createBL } from './createBl';

export const useInitBlSection = () => {
    const { exportT, exportStorageT } = tablesStore;
    const table: ExportRowT[] = exportContractStore.operation === 'export' ? exportT : exportStorageT;

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
