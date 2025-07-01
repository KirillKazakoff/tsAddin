import { createDoc } from '../../excel/utils/excelUtilsObj/createDoc';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { InvoiceKTIGroupT } from './groupInvoiceKTIByNo';
import { initInvoiceKTItmp } from './initInvoiceKTItmp';

export const createInvoiceKTI = async (invoice: InvoiceKTIGroupT) => {
    let fileName = '';
    const { row } = invoice.record;

    if (invoice.record.type === 'dischargeInvoicesT') {
        fileName = `KTI Discharge invoice - ${row.id} ${row.seller.code}`;
    } else {
        fileName = `KTI Storage invoice - ${row.id} ${row.seller.code}`;
    }

    await createDoc({
        tmpPath: 'invoiceKTIDischarge',
        initTmpsCb: async (book) => {
            const ws = book.getWorksheet('Invoice_KTI');
            const utils = initExcelUtils(ws, '');

            await initInvoiceKTItmp(book, invoice);

            utils.getRow('Инвойс_п_граница').addPageBreak();
        },
        fileName,
    });
};
