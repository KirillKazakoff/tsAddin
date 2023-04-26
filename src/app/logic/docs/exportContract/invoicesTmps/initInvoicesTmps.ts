/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { InvoicesTmpsSettingsT } from '../../../../types/typesExcelUtils';
import { clearInvoiceBlRows } from './invoiceTmp/clearInvoiceBlRows';
import { mergeInvoicesCells } from './mergeInvoicesCells';

export const initInvoicesTmps = async (settings: InvoicesTmpsSettingsT) => {
    const {
        book, initInvoiceTmpCb, invoices, sheetName,
    } = settings;
    const wsOriginal = book.getWorksheet(sheetName);

    Object.keys(invoices).forEach((key) => {
        const invoice = invoices[key];
        initInvoiceTmpCb(wsOriginal, invoice);

        const wsCopyTo = book.addWorksheet();
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);

        const suffix = sheetName === 'Com_Invoice' ? 'N' : '';
        wsCopyTo.name = `invoice ${key}${suffix}`;

        clearInvoiceBlRows(wsOriginal, wsCopyTo, invoice);
        book.removeWorksheet(sheetName);
    });

    await mergeInvoicesCells(book);
};
