import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { InvoiceKTIT } from './groupInvoiceKTIByNo';
import { initInvoiceKTItmp } from './initInvoiceKTItmp';
import { mergeInvoiceKTICells } from './mergeInvoiceKTICells';

const createInvoiceKTIStorage = async (invoice: InvoiceKTIT) => {
    const book = await readTmp(pathObj.invoiceKTIStorage);

    initInvoiceKTItmp(book, invoice);
    await mergeInvoiceKTICells(book, [[2, 6]]);

    const fileName = `KTI Storage invoice - ${invoice.record.invoiceNo}`;
    await saveFile(book, fileName);
};

const createInvoiceKTIDischarge = async (invoice: InvoiceKTIT) => {
    const book = await readTmp(pathObj.invoiceKTIDischarge);
    initInvoiceKTItmp(book, invoice);
    // prettier-ignore
    await mergeInvoiceKTICells(book, [[2, 6]]);

    const fileName = `KTI Discharge invoice - ${invoice.record.invoiceNo}`;
    await saveFile(book, fileName);
};

export const createInvoiceKTI = async (invoice: InvoiceKTIT) => {
    if (invoice.type === 'discharge') {
        await createInvoiceKTIDischarge(invoice);
    } else {
        await createInvoiceKTIStorage(invoice);
    }
};
