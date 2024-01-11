import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { InnerGroupT } from '../groupByContractNo';
import { initInnerContractTmp } from './initInnerContractTmp';

export const createInnerContract = async (contract: InnerGroupT) => {
    const book = await readTmp(pathObj.innerContract);
    const { buyer, id } = contract.record.row;

    initInnerContractTmp(book, contract);

    await saveFile(book, `Договор ${buyer.code} №${id}`);
};
