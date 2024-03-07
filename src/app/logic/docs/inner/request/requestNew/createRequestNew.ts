import ExcelJS from 'exceljs';
import { InnerGroupT } from '../../groupInnerContracts';
import { saveFile } from '../../../../excel/utils/saveFile';
import { initRowMaker } from '../../../../excel/utils/excelUtilsObj/initRows';
import { initRequestRows } from '../initRequestRows';
import { initExcelUtils } from '../../../../excel/utils/excelUtilsObj/initExcelUtils';

export const createRequestNew = async (invoice: InnerGroupT) => {
    const book = new ExcelJS.Workbook();
    const ws = book.addWorksheet('invoiceOnly');
    const utils = initExcelUtils(ws, '');

    // column width setup
    const columns = [1, 2, 3, 4, 5, 6].map((index) => ws.getColumn(index));
    columns[0].width = 15;
    columns[1].width = 25;
    columns[2].width = 15;
    columns[3].width = 20;
    columns[4].width = 20;
    columns[5].width = 15;

    const { insertRows, insertRow } = initRowMaker(ws)();
    const r = invoice.record.row;

    const rows = {
        header: 'ЗАЯВКА',
        invoiceDate: r.contractDate,
        title: `Прошу выставить счет от ${r.contractDate}`,
        e1: '',
        between: `между ${r.seller.orgName} (ПОСТАВЩИК) на ${r.buyer.orgName}`,
    };

    insertRows({ records: Object.values(rows) });
    initRequestRows(invoice.groupedBy.request, utils);

    await saveFile(book, `Заявка на счет ${invoice.record.row.buyer.name}`);
};
