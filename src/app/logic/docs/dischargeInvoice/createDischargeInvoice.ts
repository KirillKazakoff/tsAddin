import { DischargeInvoiceT } from './groupDischargeInvoiceByNo';
import { saveFile } from '../../excel/utils/saveFile';
import { readTmp } from '../readTmp';
import { pathObj } from '../../utils/constants';
import { initDischargeInvoice } from './initDischargeInvoice';
import { mergeDischargeInvoiceCells } from './mergeDischargeInvoiceCells';

export const createDischargeInvoice = async (invoice: DischargeInvoiceT) => {
    const book = await readTmp(pathObj.dischargeInvoice);

    initDischargeInvoice(book, invoice);
    await mergeDischargeInvoiceCells(book);

    const fileName = `KTI Discharge invoice ${invoice.record.invoiceNo}`;
    await saveFile(book, fileName);
};
