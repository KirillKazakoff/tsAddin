import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { SalesGroupT } from './groupBy/groupSalesContract';
import { initSalesContractTmp } from './initSalesContractTmp';
import { initSalesInvoiceTmp } from './initSalesInvoiceTmp';

export const createSalesContract = async (contract: SalesGroupT) => {
    const { id: contractNo, isLive } = contract.record;

    const path = isLive ? pathObj.salesContractLive : pathObj.salesContract;
    const book = await readTmp(path);

    await initSalesContractTmp(book, contract);
    await initSalesInvoiceTmp(book, contract);

    const fileName = `${contract.record.buyer.codeName} ${contractNo}`;
    await saveFile(book, fileName);
};
