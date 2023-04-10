import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../../types/typesContract';
import { getCellByName as getCell } from '../../../../excel/utils/excelUtilsObj/getCell';

export const clearInvoiceBlRows = (
    wsOriginal: Worksheet,
    wsCopy: Worksheet,
    invoice: InvoiceT
) => {
    const { length } = invoice.products;

    // dont change the cells order!
    ['Инвойс_Bl_массив_п', 'Инвойс_Bl_массив'].forEach((cellName) => {
        const blRow = +getCell(wsOriginal, cellName).row;
        const startDeleteArray = blRow - length;
        wsOriginal.spliceRows(startDeleteArray, length);
        wsCopy.spliceRows(blRow, 1);
    });
};
