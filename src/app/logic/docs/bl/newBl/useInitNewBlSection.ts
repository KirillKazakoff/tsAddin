/* eslint-disable import/no-extraneous-dependencies */
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { ExportRowT } from '../../../../stores/tablesStore/set/setExport';
import { groupByBl, BlGroupT } from '../groupByBl';
import { createNewBL } from './createNewBl';

export const useInitNewBlSection = () => {
    const table = exportContractStore.currentTable;

    const blGroupsArr = Object.values(groupByBl(table));
    const onLoad = async (group: BlGroupT<ExportRowT>) => createNewBL(group);

    const onLoadAll = async () => {
        await Promise.all(blGroupsArr.map((group) => onLoad(group)));
    };

    return {
        onLoad,
        onLoadAll,
        blGroupsArr,
    };
};
