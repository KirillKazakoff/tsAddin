import ExcelJS from 'exceljs';
import { initAssortiment } from './initAssortiment';
import { saveFile } from '../../excel/utils/saveFile';
import { AssortimentT } from './initAssortimentTable';

export const createSample = async (assortiment: AssortimentT) => {
    const book = new ExcelJS.Workbook();
    const ws = book.addWorksheet('sample');
    initAssortiment(assortiment, ws);

    const consignee = assortiment.record.consignee.codeName;
    await saveFile(book, `Sample plan ${consignee}`);
};
