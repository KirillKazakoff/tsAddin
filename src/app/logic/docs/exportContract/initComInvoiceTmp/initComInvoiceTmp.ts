import { Worksheet } from 'exceljs';
import { InvoiceT } from '../../../../types/typesContract';
import { initExcelUtils } from '../../../excel/utils/excelUtilsObj/initExcelUtils';
import { initComInvoiceBl } from './initComInvoiceBl';
import { initComInvoiceBody } from './initComInvoiceBody';
import { initComInvoiceHeader } from './initComInvoiceHeader';

export const initComInvoiceTmp = (ws: Worksheet, invoice: InvoiceT) => {
    const utils = initExcelUtils(ws);

    initComInvoiceHeader(utils, invoice);
    initComInvoiceBody(utils, invoice);
    initComInvoiceBl(utils, invoice);
};
