import { saveFile } from '../../../excel/utils/saveFile';
import { pathObj } from '../../../utils/constants';
import { readTmp } from '../../readTmp';
import { InnerGroupT } from '../groupByContractNo';

export const createInnerContract = async (contract: InnerGroupT) => {
    const book = await readTmp(pathObj.innerContract);

    // initInnerContract
    await saveFile(book, `${contract.record.row.buyer.codeName}`);
};
