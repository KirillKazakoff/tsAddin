import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../types/typesContract';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initInvoiceBodyEng } from './invoiceTmpEng/initInvoiceBodyEng';
import { initInvoiceBlsEng } from './invoiceTmpEng/initInvoiceBlsEng';
import { initInvoiceFooterEng } from './invoiceTmpEng/initInvoiceFooterEng';
import { initInvoiceHeaderEng } from './invoiceTmpEng/initInvoiceHeaderEng';
import { initInvoiceBlsRu } from './invoiceTmpRu/initInvoiceBlsRu';
import { initInvoiceBodyRu } from './invoiceTmpRu/initInvoiceBodyRu';
import { initInvoiceFooterRu } from './invoiceTmpRu/initInvoiceFooterRu';
import { initInvoiceHeaderRu } from './invoiceTmpRu/initInvoiceHeaderRu';

export const initComInvoiceTmp = (ws: Worksheet, invoice: InvoiceT) => {
    const utils = initExcelUtils(ws);

    initInvoiceHeaderEng(utils, invoice);
    initInvoiceBodyEng(utils, invoice);
    initInvoiceBlsEng(utils, invoice);
    initInvoiceFooterEng(utils, invoice);

    initInvoiceHeaderRu(utils, invoice);
    initInvoiceBodyRu(utils, invoice);
    initInvoiceBlsRu(utils, invoice);
    initInvoiceFooterRu(utils, invoice);
};
