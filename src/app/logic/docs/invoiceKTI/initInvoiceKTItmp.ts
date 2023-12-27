/* eslint-disable no-console */
import ExcelJS from 'exceljs';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initInvoiceKTIRows } from './initInvoiceKTIRows';
import { formats } from '../../excel/utils/formats';
import { InvoiceKTIGroupT } from './groupInvoiceKTIByNo';

export const initInvoiceKTItmp = (book: ExcelJS.Workbook, invoice: InvoiceKTIGroupT) => {
    const ws = book.getWorksheet('Invoice_KTI');
    const utils = initExcelUtils(ws, '');
    const { row, exportRow } = invoice.record;

    const date = {
        invoice: (locale: string) => getExcelDateStr(row.dateInvoice, locale),
        agreement: (locale: string) => getExcelDateStr(exportRow.date, locale),
        discharge: (locale: string) => getExcelDateStr(row.dateDischarge, locale),
        contract: (locale: string) => getExcelDateStr(exportRow.contract.date, locale),
    };

    const cellsEng: CellObjT[] = [
        { cell: 'Инвойс_номер', value: `KTICOLTD - ${row.invoiceNo}` },
        { cell: 'Инвойс_компания', value: exportRow.seller.eng.name },
        { cell: 'Инвойс_дата', value: date.invoice('eng') },
        {
            cell: 'Инвойс_контракт',
            value: `Storage Service contract № ${
                exportRow.contract.contractNo
            } from ${date.contract('eng')}`,
        },
        { cell: 'Инвойс_выгрузка_дата', value: date.discharge('eng') },
        { cell: 'Инвойс_транспорт', value: exportRow.transport.eng.name },
        {
            cell: 'Инвойс_соглашение',
            value: `Supplementary Agreement №${
                exportRow.agreementNo
            } dated ${date.agreement('eng')}`,
        },
        {
            cell: 'Инвойс_всего',
            value: invoice.total.priceTotal.count,
            numFmt: formats.common.priceDollar,
        },
    ];

    const cellsRu: CellObjT[] = [
        { cell: 'Инвойс_номер_п', value: `KTICOLTD - ${row.invoiceNo}` },
        { cell: 'Инвойс_компания_п', value: exportRow.seller.ru.name },
        { cell: 'Инвойс_дата_п', value: date.invoice('ru') },
        {
            cell: 'Инвойс_контракт_п',
            value: `Договор оказания услуг хранения № ${
                exportRow.contract.contractNo
            } from ${date.contract('ru')}`,
        },
        { cell: 'Инвойс_выгрузка_дата_п', value: date.discharge('ru') },
        { cell: 'Инвойс_транспорт_п', value: exportRow.transport.ru.name },
        {
            cell: 'Инвойс_соглашение_п',
            value: `Дополнительное соглашение №${
                exportRow.agreementNo
            } от ${date.agreement('ru')}`,
        },
        {
            cell: 'Инвойс_всего_п',
            value: invoice.total.priceTotal.count,
            numFmt: formats.common.priceDollar,
        },
    ];

    const cells = [...cellsEng, ...cellsRu];

    cells.forEach((cell) => {
        utils.setCell(cell);
    });

    initInvoiceKTIRows(invoice, utils);
    return cells;
};
