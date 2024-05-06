import { ExportRowT } from '../../../stores/tablesStore/set/setExport';
import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';
import { BlGroupT } from './groupByBl';
import { initBlTmp } from './initBlTmp';

export const createBL = async (blGroup: BlGroupT<ExportRowT>) => {
    await createDoc({
        tmpPath: 'newBl',
        initTmpsCb: (book) => initBlTmp(book, blGroup),
        fileName: blGroup.record.blNo,
    });
};
