import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../types/typesContract';
import { getCellByName as getCell } from '../../../excel/utils/excelUtilsObj/getCellByName';

export const clearInvoices = (
    wsOriginal: Worksheet,
    wsCopy: Worksheet,
    invoice: InvoiceT,
) => {
    const { products } = invoice;
    const blArrayCl = getCell(wsOriginal, 'Инвойс_Bl_массив');

    const startDelete = +blArrayCl.row - products.length;
    console.log(startDelete);

    wsOriginal.spliceRows(startDelete, products.length);
    wsCopy.spliceRows(+blArrayCl.row, 1);
};
