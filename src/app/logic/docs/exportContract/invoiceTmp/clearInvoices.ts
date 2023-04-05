import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../types/typesContract';
import { getCellByName as getCell } from '../../../excel/utils/excelUtilsObj/getCellByName';

export const clearInvoicesTmp = (
    wsOriginal: Worksheet,
    wsCopy: Worksheet,
    invoice: InvoiceT,
) => {
    const { length } = invoice.products;

    const clearInvoicesTmpPart = (arrayClName: string) => {
        const blRow = +getCell(wsOriginal, arrayClName).row;
        const startDeleteArray = blRow - length;
        wsOriginal.spliceRows(startDeleteArray, length);
        wsCopy.spliceRows(blRow, 1);
    };

    clearInvoicesTmpPart('Инвойс_Bl_массив');
    clearInvoicesTmpPart('Инвойс_Bl_массив_п');
};
