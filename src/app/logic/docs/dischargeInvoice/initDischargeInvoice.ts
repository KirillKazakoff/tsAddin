import ExcelJS from 'exceljs';
import { DischargeInvoiceT } from './groupInvoiceByNo';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { CellObjT } from '../../../types/typesExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initDishargeRows } from './initDishargeRows';

export const initDischargeInvoice = (
    book: ExcelJS.Workbook,
    invoice: DischargeInvoiceT,
) => {
    const ws = book.getWorksheet('Invoice_discharge');
    const utils = initExcelUtils(ws);
    const { record, exportRecord, rows } = invoice;

    const date = {
        invoice: (locale: string) => getExcelDateStr(record.invoiceDate, locale),
        agreement: (locale: string) => getExcelDateStr(exportRecord.date, locale),
        discharge: (locale: string) => getExcelDateStr(record.dischargeDate, locale),
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
    ];

    const cellsRu: CellObjT[] = [
        { cell: 'Инвойс_номер_п', value: record.invoiceNo },
        { cell: 'Инвойс_компания_п', value: exportRecord.seller.ru.name },
        { cell: 'Инвойс_дата', value: date.invoice('ru') },
        {
            cell: 'Инвойс_контракт',
            value: `Договор оказания услуг хранения № ${
                exportRecord.contract.contractNo
            } from ${date.contract('ru')}`,
        },
        { cell: 'Инвойс_выгрузка_дата', value: date.discharge('ru') },
        { cell: 'Инвойс_транспорт', value: exportRecord.transport.ru.name },
        {
            cell: 'Инвойс_соглашение',
            value: `Дополнительное соглашение №${
                exportRecord.agreementNo
            } от ${date.agreement('ru')}`,
        },
    ];

    const cells = [...cellsEng, ...cellsRu];

    cells.forEach((cell) => {
        utils.setCell(cell);
    });

    initDishargeRows(rows, utils);
    return cells;
};
