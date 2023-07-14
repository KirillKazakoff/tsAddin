import { DischargeInvoiceT } from './groupInvoiceByNo';
import { saveFile } from '../../excel/utils/saveFile';
import { readTmp } from '../readTmp';
import { pathObj } from '../../utils/constants';
import { initDischargeInvoice } from './initDischargeInvoice';

export const createDischargeInvoice = async (invoice: DischargeInvoiceT) => {
    const book = await readTmp(pathObj.dischargeInvoice);
    initDischargeInvoice(book, invoice);

    const fileName = `KTI Discharge invoice ${invoice.record.invoiceNo}`;
    await saveFile(book, fileName);
};
