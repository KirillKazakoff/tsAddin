import { ExportCommonRow } from '../../../types/typesTables';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { initBlTmp } from './initBlTmp';

export const createBL = async (row: ExportCommonRow) => {
    const book = await readTmp(pathObj.bl);
    initBlTmp(book, row);

    await saveFile(book, row.blNo);
};
