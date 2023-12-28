import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { BlGroupT } from './groupByBl';
import { readTmp } from '../readTmp';
import { initBlTmp } from './initBlTmp';
import { ExportRowT } from '../../../stores/tablesStore/set/setExport';

export const createBL = async (blGroup: BlGroupT<ExportRowT>) => {
    const book = await readTmp(pathObj.bl);
    initBlTmp(book, blGroup);

    await saveFile(book, blGroup.record.blNo);
};
