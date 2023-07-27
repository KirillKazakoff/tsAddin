import ExcelJS from 'exceljs';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initInvoiceKTIRows } from './initInvoiceKTIRows';
import { InvoiceKTIT } from './groupInvoiceKTIByNo';

export const initInvoiceKTItmp = (book: ExcelJS.Workbook, invoice: InvoiceKTIT) => {
    const ws = book.getWorksheet('Invoice_discharge');
    const utils = initExcelUtils(ws);
    const { record, exportRecord } = invoice;

    const date = {
        invoice: (locale: string) => getExcelDateStr(record.dateInvoice, locale),
        agreement: (locale: string) => getExcelDateStr(exportRecord.date, locale),
        discharge: (locale: string) => getExcelDateStr(record.dateDischarge, locale),
        contract: (locale: string) => getExcelDateStr(exportRecord.contract.date, locale),
    };

    const cellsEng: CellObjT[] = [
        { cell: 'Инвойс_номер', value: record.invoiceNo },
        { cell: 'Инвойс_компания', value: exportRecord.seller.eng.name },
        { cell: 'Инвойс_дата', value: date.invoice('eng') },
        {
            cell: 'Инвойс_контракт',
            value: `Storage Service contract № ${
                exportRecord.contract.contractNo
            } from ${date.contract('eng')}`,
        },
        { cell: 'Инвойс_выгрузка_дата', value: date.discharge('eng') },
        { cell: 'Инвойс_транспорт', value: exportRecord.transport.eng.name },
        {
            cell: 'Инвойс_соглашение',
            value: `Supplementary Agreement №${
                exportRecord.agreementNo
            } dated ${date.agreement('eng')}`,
        },
        { cell: 'Инвойс_всего', value: `$   ${invoice.priceTotal}` },
    ];

    const cellsRu: CellObjT[] = [
        { cell: 'Инвойс_номер_п', value: record.invoiceNo },
        { cell: 'Инвойс_компания_п', value: exportRecord.seller.ru.name },
        { cell: 'Инвойс_дата_п', value: date.invoice('ru') },
        {
            cell: 'Инвойс_контракт_п',
            value: `Договор оказания услуг хранения № ${
                exportRecord.contract.contractNo
            } from ${date.contract('ru')}`,
        },
        { cell: 'Инвойс_выгрузка_дата_п', value: date.discharge('ru') },
        { cell: 'Инвойс_транспорт_п', value: exportRecord.transport.ru.name },
        {
            cell: 'Инвойс_соглашение_п',
            value: `Дополнительное соглашение №${
                exportRecord.agreementNo
            } от ${date.agreement('ru')}`,
        },
        { cell: 'Инвойс_всего_п', value: `$   ${invoice.priceTotal}` },
    ];

    const cells = [...cellsEng, ...cellsRu];

    cells.forEach((cell) => {
        try {
            utils.setCell(cell);
        } catch (e) {
            console.log(cell);
        }
    });

    initInvoiceKTIRows(invoice, utils);
    return cells;
};
