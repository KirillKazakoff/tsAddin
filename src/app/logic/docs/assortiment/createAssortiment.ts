/* eslint-disable no-param-reassign */
import ExcelJS from 'exceljs';
import { saveFile } from '../../excel/utils/saveFile';
import { initAssortiment } from './initAssortiment';
import { AssortimentT } from '../../../types/typesAssortiment';

export const createAssortiment = async (assortiment: AssortimentT) => {
    const book = new ExcelJS.Workbook();
    const ws = book.addWorksheet('assortiment');
    initAssortiment(assortiment, ws);

    const { transport } = assortiment.record;
    await saveFile(book, `Assortment ${transport.eng.name}`);
};
