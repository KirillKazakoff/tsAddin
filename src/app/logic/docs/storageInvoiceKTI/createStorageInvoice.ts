import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';

export const createStorageInvoice = async (invoice: any) => {
    const book = await readTmp(pathObj.storageInvoice);

    // initStorageInvoice(book, invoice);
    // await mergeDischargeInvoiceCells(book);

    const fileName = `KTI Storage Invoice ${invoice.record.invoiceNo}`;
    await saveFile(book, fileName);
};
