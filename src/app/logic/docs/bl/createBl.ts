import { ExportRowT } from '../../../stores/tablesStore/set/setExport';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { BlGroupT } from './groupByBl';
import { initNewBlTmp } from './initBlTmp';

export const createNewBL = async (blGroup: BlGroupT<ExportRowT>) => {
    const book = await readTmp(pathObj.newBl);
    initNewBlTmp(book, blGroup);

    await saveFile(book, blGroup.record.blNo);
};
