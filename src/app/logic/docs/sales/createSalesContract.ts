import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { SalesContractT } from './groupBy/initSalesContract';
import { initSalesContractTmp } from './initSalesContractTmp';

export const createSalesContract = async (contract: SalesContractT) => {
    const { id: contractNo, isLive } = contract.record;

    const path = isLive ? pathObj.salesContractLive : pathObj.salesContract;
    const book = await readTmp(path);

    await initSalesContractTmp(book, contract);

    const fileName = `${contract.record.buyer.codeName} ${contractNo}`;
    await saveFile(book, fileName);
};