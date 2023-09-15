import { BlGroupT } from '../../../types/typesContract';
import { ExportRowT } from '../../../types/typesTables';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { initBlTmp } from './initBlTmp';

export const createBL = async (blGroup: BlGroupT<ExportRowT>) => {
    const book = await readTmp(pathObj.bl);
    initBlTmp(book, blGroup);

    await saveFile(book, blGroup.record.blNo);
};
