/* eslint-disable import/no-extraneous-dependencies */
import { Workbook } from 'exceljs';
import _ from 'lodash';
import { InvoicesT } from '../../../../types/typesContract';
import { clearInvoiceBlRows } from './invoiceTmp/clearInvoiceBlRows';
import { initComInvoiceTmp } from './invoiceTmp/initComInvoiceTmp';
import { mergeInvoicesCells } from './mergeInvoicesCells';

export const initInvoicesTmps = async (book: Workbook, invoices: InvoicesT) => {
    const wsOriginal = book.getWorksheet('Com_Invoice');

    Object.keys(invoices).forEach((key) => {
        const invoice = invoices[key];
        initComInvoiceTmp(wsOriginal, invoice);

        const wsCopyTo = book.addWorksheet();
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);
        wsCopyTo.name = `invoice ${key}`;

        clearInvoiceBlRows(wsOriginal, wsCopyTo, invoice);
        book.removeWorksheet('Com_Invoice');
    });

    await mergeInvoicesCells(book);
};
