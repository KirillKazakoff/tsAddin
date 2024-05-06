import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';
import { PathKeyT } from '../../utils/constants';
import { InvoiceKTIGroupT } from './groupInvoiceKTIByNo';
import { initInvoiceKTItmp } from './initInvoiceKTItmp';
import { mergeInvoiceKTICells } from './mergeInvoiceKTICells';

export const createInvoiceKTI = (invoice: InvoiceKTIGroupT) => {
    let tmpPath: PathKeyT;
    let fileName = '';

    if (invoice.record.type === 'dischargeInvoicesT') {
        tmpPath = 'invoiceKTIDischarge';
        fileName = `KTI Discharge invoice - ${invoice.record.row.invoiceNo}`;
    } else {
        tmpPath = 'invoiceKTIStorage';
        fileName = `KTI Storage invoice - ${invoice.record.row.invoiceNo}`;
    }

    createDoc({
        tmpPath,
        initTmpsCb: async (book) => {
            initInvoiceKTItmp(book, invoice);
            await mergeInvoiceKTICells(book);
        },
        fileName,
    });
};
