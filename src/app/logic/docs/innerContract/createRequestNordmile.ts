import { NordmileRowT } from '../../../types/typesTables';
import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { initRequestNordmileTmp } from './requestTmp/initRequestNordmileTmp';

export const createRequestNordmile = async (row: NordmileRowT) => {
    const book = await readTmp(pathObj.requestContractNordmileRu);

    initRequestNordmileTmp(book, row);
    await saveFile(book, `Заявка ${row.buyer}`);
};
