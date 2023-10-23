import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../groupBy/initInvoice';
import { getExportInvoiceCells } from './getExportInvoiceCells';
import { initExcelUtilsDouble } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initNewInvoiceRows } from './initNewInvoiceRows';

export const initExportInvoiceTmp = (ws: Worksheet, invoice: InvoiceT) => {
    const utils = initExcelUtilsDouble(ws, 4);
    const cells = getExportInvoiceCells(invoice);

    cells.forEach((cell) => {
        utils.setCell(cell);
    });

    initNewInvoiceRows(utils, invoice);

    if (invoice.record.type === 'export' && invoice.record.terms === 'EXW') {
        const cellsEXW = ['Инвойс_транспорт', 'Инвойс_куда', 'Инвойс_откуда'];
        // reset departure fields
        cellsEXW.forEach((name) => {
            const cell = utils.getCell(name);
            cell.cellRus.value = '';
            cell.cellEng.value = '';

            const titleCl = utils.getCell(name, -1);
            titleCl.cellEng.value = '';
            titleCl.cellRus.value = '';
        });
    }
};
