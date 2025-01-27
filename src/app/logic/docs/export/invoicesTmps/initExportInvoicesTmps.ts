/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import { Workbook } from 'exceljs';
import _ from 'lodash';
import { getExportInvoiceCells } from './getExportInvoiceCells';
import exportContractStore from '../../../../stores/docsStores/exportContractStore';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { mergeExportInvoice } from './mergeExportInvoices';
import { ExportGroupT } from '../groupAgByNo';

export const initExportInvoicesTmps = async (
    book: Workbook,
    invoices: ExportGroupT[],
) => {
    const sheetName = 'Invoice';
    const wsOriginal = book.getWorksheet(sheetName);
    book.removeWorksheet(sheetName);

    // no invoices if certificate contract
    if (exportContractStore.operation === 'certificates') {
        book.removeWorksheet(sheetName);
        return;
    }

    const utils = initExcelUtils(wsOriginal, 'MID_Invoice');

    for await (const invoice of invoices) {
        // initInvoice
        const key = invoice.code;
        const cells = getExportInvoiceCells(invoice);

        cells.forEach((cell) => utils.setCell(cell));

        // finish initInvoice
        await utils.initPictures(
            [
                {
                    key: exportContractStore.fields.podpisant.code,
                    range: {
                        start: 'Invoice_sign_seller_start',
                        ext: { height: 80, width: 180 },
                    },
                },
                {
                    key: invoice.record.seller.code,
                    range: {
                        start: 'Invoice_seal_seller_start',
                        ext: { height: 175, width: 175 },
                    },
                },
            ],
            exportContractStore.fields.isPictures,
        );

        const wsCopyTo = book.addWorksheet(`invoice ${key}`);
        wsCopyTo.model = _.cloneDeep(wsOriginal.model);
        wsCopyTo.name = `invoice ${key}`;

        await mergeExportInvoice(book, invoice);
    }
};
