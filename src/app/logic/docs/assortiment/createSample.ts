import ExcelJS from 'exceljs';
import { initAssortiment } from './initAssortiment';
import { saveFile } from '../../excel/utils/saveFile';
import { AssortimentObjT } from './initAssortimentObj';

export const createSample = async (assortiment: AssortimentObjT) => {
    const book = new ExcelJS.Workbook();
    const ws = book.addWorksheet('sample');
    initAssortiment(assortiment, ws);

    const consignee = assortiment.record.consignee.code;
    await saveFile(book, `Sample plan ${consignee}`);
};
