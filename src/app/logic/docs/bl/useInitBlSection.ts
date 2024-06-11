import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { ExportRowT } from '../../../stores/tablesStore/set/setExport';
import { groupByBl, BlGroupT } from './groupByBl';
import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';
import { initBlTmp } from './initBlTmp';

export const useInitBlSection = () => {
    const table = exportContractStore.currentTable;

    const blGroupsArr = Object.values(groupByBl(table));

    const onLoad = async (group: BlGroupT<ExportRowT>) => {
        await createDoc({
            tmpPath: 'bl',
            initTmpsCb: (book) => initBlTmp(book, group),
            fileName: group.record.blNo,
        });
    };

    const onLoadAll = async () => {
        await Promise.all(blGroupsArr.map((group) => onLoad(group)));
    };

    return {
        onLoad,
        onLoadAll,
        blGroupsArr,
    };
};
