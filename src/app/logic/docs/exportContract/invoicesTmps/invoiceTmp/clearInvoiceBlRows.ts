import { Worksheet } from 'exceljs';
import { clearRows } from '../../../../excel/utils/clearRows';
import { InvoiceT } from '../../groupBy/initInvoice';

export const clearInvoiceBlRows = (
    wsOriginal: Worksheet,
    wsCopy: Worksheet,
    invoice: InvoiceT,
) => {
    const { length } = Object.values(invoice.productGroups);

    // dont change the cells order!
    ['Инвойс_Bl_массив_п', 'Инвойс_Bl_массив'].forEach((cellName) => {
        clearRows(wsOriginal, wsCopy, length, cellName);
    });
};
