import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../types/typesContract';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initInvoiceBodyEng } from './invoiceTmpEng/initComInvoiceBody';
import { initInvoiceBlsEng } from './invoiceTmpEng/initInvoiceBlsEng';
import { initInvoiceFooterEng } from './invoiceTmpEng/initInvoiceFooterEng';
import { initInvoiceHeaderEng } from './invoiceTmpEng/initInvoiceHeaderEng';

export const initComInvoiceTmp = (ws: Worksheet, invoice: InvoiceT) => {
    const utils = initExcelUtils(ws);

    initInvoiceHeaderEng(utils, invoice);
    initInvoiceBodyEng(utils, invoice);
    initInvoiceBlsEng(utils, invoice);
    initInvoiceFooterEng(utils, invoice);
};
