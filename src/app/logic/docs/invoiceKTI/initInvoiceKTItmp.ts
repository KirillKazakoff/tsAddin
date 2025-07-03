import ExcelJS from 'exceljs';
import { initExcelUtils } from '../../excel/utils/excelUtilsObj/initExcelUtils';
import { getExcelDateStr } from '../../excel/utils/getExcelDate';
import { initInvoiceKTIRows } from './initInvoiceKTIRows';
import { InvoiceKTIGroupT } from './groupInvoiceKTIByNo';
import { initPictureGit } from '../../excel/pictures/initPictureGit';
import { pathObj } from '../../utils/constants';
import invoicesKTIStore from '../../../stores/docsStores/invoicesKTIStore';

export const initInvoiceKTItmp = async (
    book: ExcelJS.Workbook,
    invoice: InvoiceKTIGroupT,
) => {
    const ws = book.getWorksheet('Invoice_KTI');
    const utils = initExcelUtils(ws, '');
    const {
        row, exportRow, dischargeDate, type,
    } = invoice.record;
    const { translator } = invoicesKTIStore.fields;

    const date = {
        invoice: (locale: string) => getExcelDateStr(row.dateInvoice, locale),
        agreement: (locale: string) => getExcelDateStr(exportRow.date, locale),
        discharge: (locale: string) => getExcelDateStr(dischargeDate, locale),
        contract: (locale: string) => getExcelDateStr(exportRow.contract.date, locale),
    };

    await Promise.all(
        ['KTI_LOGO'].map(async (start) => initPictureGit({
            url: pathObj.pictures.kti,
            ws,
            rangeObj: { start, ext: { width: 65, height: 45 } },
        })),
    );

    // prettier-ignore
    await utils.initTmp({
        cells: [
            { name: 'Инвойс_исполнитель_ТНИ', height: translator === 'ТНИ' ? 76 : 1 },
            { name: 'Инвойс_исполнитель_КИА', height: translator === 'КИА' ? 76 : 1 },
            { name: 'Инвойс_печать', height: 1 },
            { name: 'Инвойс_номер', value: `KTICOLTD - ${row.id}` },
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
            {
                name: 'Инвойс_объект',
                value: `Request for payment for ${type === 'dischargeInvoicesT' ? 'discharging operation' : 'cold storage'}`,
            },
            { name: 'Инвойс_номер_п', value: `KTICOLTD - ${row.id}` },
            { name: 'Инвойс_компания_п', value: `ООО "${exportRow.seller.ru.shortName}"` },
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
            {
                name: 'Инвойс_объект_п',
                value: `Запрос на оплату ${type === 'dischargeInvoicesT' ? 'разгрузочных работ' : 'складского хранения в холодильнике'}`,
            },
        ],
        initRows: () => initInvoiceKTIRows(invoice, utils),
        printSettings: { endCell: 'Инвойс_печать', column: 'I' },
        mergeCells: [
            {
                row: {
                    from: { name: 'Инвойс_перевод_старт_п' },
                    to: { name: 'Инвойс_перевод_конец_п' },
                },
                cols: [[2, 8]],
            },
        ],
    });
};
