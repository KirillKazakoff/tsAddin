import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initRequestTmp } from './requestTmp/initRequestTmp';

export const createRequestContract = async (contract: ContractT) => {
    const { record } = contract;
    const book = await readTmp(pathObj.requestContractRu);

    initRequestTmp(book, contract);
    await saveFile(book, record.contractNo);
};
