import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { ContractT } from './groupByContractNo';
import { initPortLetterTmp } from './portLetterTmp/initPortLetterTmp';

export const createPortLetter = async (contract: ContractT) => {
    const { record } = contract;
    const book = await readTmp(pathObj.portLetter);

    initPortLetterTmp(book, contract);
    await saveFile(book, `Письмо ${record.buyer.codeName}`);
};
