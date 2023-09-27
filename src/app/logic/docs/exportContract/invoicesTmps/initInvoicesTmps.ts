/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { InvoicesTmpsSettingsT } from '../../../../types/typesExcelUtils';
import { clearInvoiceBlRows } from './invoiceTmp/clearInvoiceBlRows';
import { mergeInvoicesCells } from './mergeInvoicesCells';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';

export const initInvoicesTmps = async (settings: InvoicesTmpsSettingsT) => {
    const {
        book, initInvoiceTmpCb, invoices, sheetName,
    } = settings;
    const wsOriginal = book.getWorksheet(sheetName);

    // no invoices if certificate contract
    if (exportContractStore.operation === 'certificates') {
        book.removeWorksheet('Noncom_Invoice');
        return;
    }

    Object.keys(invoices).forEach((key) => {
        const invoice = invoices[key];
        initInvoiceTmpCb(wsOriginal, invoice);

        const wsCopyTo = book.addWorksheet();
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);

        wsCopyTo.name = `invoice ${key}`;

        clearInvoiceBlRows(wsOriginal, wsCopyTo, invoice);
        book.removeWorksheet(sheetName);
    });

    const { agreement } = Object.values(invoices)[0];
    await mergeInvoicesCells(book, agreement);
};
