/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { Workbook } from 'exceljs';
import { getExportInvoiceCells } from './getExportInvoiceCells';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import {
    initExcelUtils,
    initExcelUtilsDouble,
} from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { InvoicesT } from '../groupBy/initInvoice';
import { mergeCoppiedInvoice } from './mergeCoppiedInvoices';

export const initExportInvoicesTmps = async (book: Workbook, invoices: InvoicesT) => {
    const sheetName = 'Invoice';
    const wsOriginal = book.getWorksheet(sheetName);

    // no invoices if certificate contract
    if (exportContractStore.operation === 'certificates') {
        book.removeWorksheet(sheetName);
        return;
    }

    const utilsDouble = initExcelUtilsDouble(wsOriginal, 6);
    const utilsSingle = initExcelUtils(wsOriginal);

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

        const wsCopyTo = book.addWorksheet();
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);
        wsCopyTo.name = `invoice ${key}`;

        await mergeCoppiedInvoice(book, invoice);
    }

    book.removeWorksheet(sheetName);
};
