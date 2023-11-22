/* eslint-disable no-param-reassign */
import ExcelJS from 'exceljs';
import { saveFile } from '../../excel/utils/saveFile';
import { initAssortiment } from './initAssortiment';
import { AssortimentObjT } from './initAssortimentObj';

export const createAssortiment = async (assortiment: AssortimentObjT) => {
    const book = new ExcelJS.Workbook();
    const ws = book.addWorksheet('assortiment');
    initAssortiment(assortiment, ws);

    const { transport } = assortiment.record;
    await saveFile(book, `Assortment ${transport.eng.name}`);
};
