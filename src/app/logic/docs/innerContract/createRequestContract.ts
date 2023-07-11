import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initRequestTmp } from './requestTmp/initRequestTmp';

export const createRequestContract = async (contract: ContractT) => {
    const book = await readTmp(pathObj.requestContractRu);

    initRequestTmp(book, contract);
    await saveFile(book, `Заявка ${contract.record.buyer.codeName}`);
};
