import ExcelJS from 'exceljs';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initInvoiceKTIRows } from './initInvoiceKTIRows';
import { InvoiceKTIGroupT } from './groupInvoiceKTIByNo';
import { initPictureGit } from '../../excel/pictures/initPictureGit';
import { pathObj } from '../../utils/constants';

export const initInvoiceKTItmp = async (
    book: ExcelJS.Workbook,
    invoice: InvoiceKTIGroupT,
) => {
    const ws = book.getWorksheet('Invoice_KTI');
    const utils = initExcelUtils(ws, '');
    const { row, exportRow, dischargeDate } = invoice.record;

    const date = {
        invoice: (locale: string) => getExcelDateStr(row.dateInvoice, locale),
        agreement: (locale: string) => getExcelDateStr(exportRow.date, locale),
        discharge: (locale: string) => getExcelDateStr(dischargeDate, locale),
        contract: (locale: string) => getExcelDateStr(exportRow.contract.date, locale),
    };

    await Promise.all(
        ['KTI_LOGO', 'KTI_LOGO_п'].map(async (start) => initPictureGit({
            url: pathObj.pictures.kti,
            ws,
            rangeObj: { start, ext: { width: 65, height: 45 } },
        })),
    );

    await utils.initTmp({
        cells: [
            { name: 'Инвойс_номер', value: `KTICOLTD - ${row.invoiceNo}` },
            { name: 'Инвойс_компания', value: exportRow.seller.eng.name },
            { name: 'Инвойс_дата', value: date.invoice('eng') },
            {
                name: 'Инвойс_контракт',
                value: `Storage Service contract № ${
                    exportRow.contract.contractNo
                } from ${date.contract('eng')}`,
            },
            { name: 'Инвойс_выгрузка_дата', value: date.discharge('eng') },
            { name: 'Инвойс_транспорт', value: exportRow.transport.eng.name },
            {
                name: 'Инвойс_соглашение',
                value: `Supplementary Agreement №${
                    exportRow.agreementNo
                } dated ${date.agreement('eng')}`,
            },
            { name: 'Инвойс_номер_п', value: `KTICOLTD - ${row.invoiceNo}` },
            { name: 'Инвойс_компания_п', value: exportRow.seller.ru.name },
            { name: 'Инвойс_дата_п', value: date.invoice('ru') },
            {
                name: 'Инвойс_контракт_п',
                value: `Договор оказания услуг хранения № ${
                    exportRow.contract.contractNo
                } от ${date.contract('ru')}`,
            },
            { name: 'Инвойс_выгрузка_дата_п', value: date.discharge('ru') },
            { name: 'Инвойс_транспорт_п', value: exportRow.transport.ru.name },
            {
                name: 'Инвойс_соглашение_п',
                value: `Дополнительное соглашение №${
                    exportRow.agreementNo
                } от ${date.agreement('ru')}`,
            },
        ],
        initRows: () => initInvoiceKTIRows(invoice, utils),
        printSettings: { endCell: 'Инвойс_печать', column: 'I' },
    });
};
