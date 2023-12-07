import { saveFile } from '../../excel/utils/saveFile';
import { pathObj } from '../../utils/constants';
import { readTmp } from '../readTmp';
import { InvoiceKTIGroupT } from './groupInvoiceKTIByNo';
import { initInvoiceKTItmp } from './initInvoiceKTItmp';
import { mergeInvoiceKTICells } from './mergeInvoiceKTICells';

const createInvoiceKTIStorage = async (invoice: InvoiceKTIGroupT) => {
    const book = await readTmp(pathObj.invoiceKTIStorage);

    initInvoiceKTItmp(book, invoice);
    await mergeInvoiceKTICells(book);

    const fileName = `KTI Storage invoice - ${invoice.record.row.invoiceNo}`;
    await saveFile(book, fileName);
};

const createInvoiceKTIDischarge = async (invoice: InvoiceKTIGroupT) => {
    const book = await readTmp(pathObj.invoiceKTIDischarge);
    initInvoiceKTItmp(book, invoice);
    // prettier-ignore
    await mergeInvoiceKTICells(book);

    const fileName = `KTI Discharge invoice - ${invoice.record.row.invoiceNo}`;
    await saveFile(book, fileName);
};

export const createInvoiceKTI = async (invoice: InvoiceKTIGroupT) => {
    if (invoice.record.type === 'dischargeInvoices') {
        await createInvoiceKTIDischarge(invoice);
    } else {
        await createInvoiceKTIStorage(invoice);
    }
};
