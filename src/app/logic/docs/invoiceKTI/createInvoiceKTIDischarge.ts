import { saveFile } from '../../excel/utils/saveFile';
import { readTmp } from '../readTmp';
import { pathObj } from '../../utils/constants';
import { initDischargeInvoice } from './initInvoiceKTI';
import { InvoiceKTIT } from './groupInvoiceKTIByNo';
import { mergeDischargeInvoiceCells } from './mergeDischargeInvoiceCells';

export const createDischargeInvoice = async (invoice: InvoiceKTIT) => {
    const book = await readTmp(pathObj.InvoiceKTIDischarge);

    initDischargeInvoice(book, invoice);
    await mergeDischargeInvoiceCells(book);

    const fileName = `KTI Discharge invoice ${invoice.record.invoiceNo}`;
    await saveFile(book, fileName);
};