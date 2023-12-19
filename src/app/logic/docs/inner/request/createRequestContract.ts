import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { InnerGroupT } from '../groupByContractNo';
import { initRequestTmp } from './initRequestTmp';

export const createRequestContract = async (contract: InnerGroupT) => {
    const book = await readTmp(pathObj.requestContractRu);

    initRequestTmp(book, contract);
    await saveFile(book, `Заявка ${contract.record.row.buyer.codeName}`);
};
