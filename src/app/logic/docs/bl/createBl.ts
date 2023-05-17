import { BlGroupT } from '../../../types/typesContract';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { initBlTmp } from './initBlTmp';

export const createBL = async (blGroup: BlGroupT) => {
    const book = await readTmp(pathObj.bl);
    initBlTmp(book, blGroup);

    await saveFile(book, blGroup.record.blNo);
};
