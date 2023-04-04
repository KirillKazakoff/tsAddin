/* eslint-disable import/no-extraneous-dependencies */
import { Workbook } from 'exceljs';
import _ from 'lodash';
import { InvoicesT } from '../../../types/typesContract';
import { deleteRow } from '../../excel/utils/excelUtilsObj/deleteRow';
import { clearInvoices } from './initComInvoiceTmp/clearInvoices';
import { initComInvoiceTmp } from './initComInvoiceTmp/initComInvoiceTmp';

export const createInvoices = (book: Workbook, invoices: InvoicesT) => {
    const wsOriginal = book.getWorksheet('Com_Invoice');

    Object.keys(invoices).forEach((key) => {
        const invoice = invoices[key];
        initComInvoiceTmp(wsOriginal, invoice);

        const wsCopyTo = book.addWorksheet('New_Invoice');

        wsCopyTo.model = _.cloneDeep(wsOriginal.model);
        wsCopyTo.name = `invoice ${key}`;

        wsCopyTo.mergeCells(7, 1, 7, 3);
        wsCopyTo.mergeCells(7, 4, 7, 7);
        wsCopyTo.mergeCells(72, 1, 72, 3);
        wsCopyTo.mergeCells(72, 4, 72, 7);

        clearInvoices(wsOriginal, wsCopyTo, invoice);
    });
};
