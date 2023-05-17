import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../../types/typesContract';
import { clearRows } from '../../../../excel/utils/clearRows';

export const clearInvoiceBlRows = (
    wsOriginal: Worksheet,
    wsCopy: Worksheet,
    invoice: InvoiceT,
) => {
    const { length } = invoice.rows;

    // dont change the cells order!

    ['Инвойс_Bl_массив_п', 'Инвойс_Bl_массив'].forEach((cellName) => {
        clearRows(wsOriginal, wsCopy, length, cellName);
    });
};
