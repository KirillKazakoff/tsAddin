import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';
import { SalesGroupT } from './groupSalesContract';
import { initSalesContractTmp } from './initSalesContractTmp';
import { initSalesInvoiceTmp } from './initSalesInvoiceTmp';

export const createSalesContract = async (contract: SalesGroupT) => {
    const { id: contractNo, isLive } = contract.record;

    await createDoc({
        tmpPath: isLive ? 'salesContractLive' : 'salesContract',
        fileName: `${contract.record.buyer.code} ${contractNo}`,
        initTmpsCb: async (book) => {
            await initSalesContractTmp(book, contract);
            await initSalesInvoiceTmp(book, contract);
        },
    });
};
