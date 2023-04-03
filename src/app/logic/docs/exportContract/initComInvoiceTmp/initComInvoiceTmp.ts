import { Workbook } from 'exceljs';
import { InvoiceT } from '../../../../types/typesContract';
import { initCellUtils } from '../../../excel/utils/cellUtils/initCellUtils';
import { initComInvoiceHeader } from './initComInvoiceHeader';

export const initComInvoiceTmp = (book: Workbook, invoice: InvoiceT) => {
    const ws = book.getWorksheet('Com_Invoice');
    const utils = initCellUtils(ws);

    initComInvoiceHeader(utils, invoice);
};
