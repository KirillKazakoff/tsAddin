/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { Workbook } from 'exceljs';
import exportContractStore from '../../../../../stores/docsStores/exportContractStore';
import { mergeInvoicesCells } from '../mergeInvoicesCells';
import { clearInvoiceBlRows } from './clearInvoiceBlRows';
import { InvoicesT } from '../../groupBy/initInvoice';
import { initExportInvoiceTmp } from './initExportInvoiceTmp';

export const initExportInvoicesTmps = async (
    book: Workbook,
    invoices: InvoicesT,
) => {
    const sheetName = 'Invoice';
    const wsOriginal = book.getWorksheet(sheetName);

    // no invoices if certificate contract
    if (exportContractStore.operation === 'certificates') {
        book.removeWorksheet(sheetName);
        return;
    }

    Object.keys(invoices).forEach((key) => {
        const invoice = invoices[key];

        initExportInvoiceTmp(wsOriginal, invoice);

        const wsCopyTo = book.addWorksheet();
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);

        wsCopyTo.name = `invoice ${key}`;

        clearInvoiceBlRows(wsOriginal, wsCopyTo, invoice);
        book.removeWorksheet(sheetName);
    });

    const { agreement } = Object.values(invoices)[0];
    await mergeInvoicesCells(book, agreement);
};
