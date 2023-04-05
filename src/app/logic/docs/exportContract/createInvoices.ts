/* eslint-disable import/no-extraneous-dependencies */
import { Cell, Workbook } from 'exceljs';
import _ from 'lodash';
import { InvoicesT } from '../../../types/typesContract';
import { clearInvoicesTmp } from './initComInvoiceTmp/clearInvoices';
import { initComInvoiceTmp } from './initComInvoiceTmp/initComInvoiceTmp';

export const createInvoices = async (book: Workbook, invoices: InvoicesT) => {
    const wsOriginal = book.getWorksheet('Com_Invoice');

    Object.keys(invoices).forEach((key) => {
        const invoice = invoices[key];
        initComInvoiceTmp(wsOriginal, invoice);

        const wsCopyTo = book.addWorksheet('New_Invoice');
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);
        wsCopyTo.name = `invoice ${key}`;

        clearInvoicesTmp(wsOriginal, wsCopyTo, invoice);
    });

    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);
    book.worksheets.forEach((ws) => {
        if (ws.name !== 'Export_Contract') {
            let consigneeTitleEngCl: Cell;
            let consigneeTitleRuCl: Cell;

            ws.eachRow((row) => {
                row.eachCell((cell) => {
                    if (!cell.value) return;
                    const valueStr = cell.value.toString();
                    if (valueStr.includes('Consignee')) {
                        consigneeTitleEngCl = cell;
                    }
                    if (valueStr.includes('Получатель')) {
                        consigneeTitleRuCl = cell;
                    }
                });
            });

            const engRow = +consigneeTitleEngCl.row + 2;
            const ruRow = +consigneeTitleRuCl.row + 2;

            ws.unMergeCells(engRow, 1, engRow, 3);
            ws.mergeCells(engRow, 1, engRow, 3);
            ws.unMergeCells(engRow, 4, engRow, 7);
            ws.mergeCells(engRow, 4, engRow, 7);

            ws.unMergeCells(ruRow, 4, ruRow, 7);
            ws.mergeCells(ruRow, 4, ruRow, 7);
            ws.unMergeCells(ruRow, 1, ruRow, 3);
            ws.mergeCells(ruRow, 1, ruRow, 3);
        }
    });
};
