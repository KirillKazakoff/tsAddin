import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../types/typesContract';
import { getCellByName as getCell } from '../../../excel/utils/excelUtilsObj/getCellByName';

export const clearInvoicesTmp = (
    wsOriginal: Worksheet,
    wsCopy: Worksheet,
    invoice: InvoiceT,
) => {
    const { products } = invoice;
    const blRow = +getCell(wsOriginal, 'Инвойс_Bl_массив').row;

    const startDeleteArray = blRow - products.length;

    wsOriginal.spliceRows(startDeleteArray, products.length);
    wsCopy.spliceRows(blRow, 1);
};
