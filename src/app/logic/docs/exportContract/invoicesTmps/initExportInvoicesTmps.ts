/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import { Workbook } from 'exceljs';
import _ from 'lodash';
import { getExportInvoiceCells } from './getExportInvoiceCells';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InvoicesT } from '../groupBy/initInvoice';
import { mergeExportInvoice } from './mergeExportInvoices';

export const initExportInvoicesTmps = async (book: Workbook, invoices: InvoicesT) => {
    const sheetName = 'Invoice';
    const wsOriginal = book.getWorksheet(sheetName);
    book.removeWorksheet(sheetName);

    // no invoices if certificate contract
    if (exportContractStore.operation === 'certificates') {
        book.removeWorksheet(sheetName);
        return;
    }

    const utilsDouble = initExcelUtils(wsOriginal, 'MID_Invoice');
    const utilsSingle = initExcelUtils(wsOriginal, '');

    for await (const key of Object.keys(invoices)) {
        const invoice = invoices[key];
        // initInvoice

        const cells = getExportInvoiceCells(invoice);
        cells.double.forEach((cell) => utilsDouble.setCell(cell));
        cells.single.forEach((cell) => utilsSingle.setCell(cell));

        if (invoice.record.type === 'export' && invoice.record.terms === 'EXW') {
            const row = utilsDouble.getRow('Инвойс_транспорт', -1);
            wsOriginal.spliceRows(row.number, 2);
        }
        // finish initInvoice

        const wsCopyTo = book.addWorksheet(`invoice ${key}`);
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);
        wsCopyTo.name = `invoice ${key}`;

        await mergeExportInvoice(book, invoice);
    }
};
