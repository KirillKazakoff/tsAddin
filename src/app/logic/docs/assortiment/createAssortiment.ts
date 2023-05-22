/* eslint-disable no-param-reassign */
import ExcelJS from 'exceljs';
import { AssortimentT } from './group/groupAssortiment';
import { saveFile } from '../../excel/utils/saveFile';
import { initAssortiment } from './initAssortiment';

export const createAssortiment = async (assortiment: AssortimentT) => {
    try {
        const book = new ExcelJS.Workbook();
        const ws = book.addWorksheet('assortiment');
        initAssortiment(assortiment, ws);

        const { transport } = assortiment.record;
        await saveFile(book, `Assortiment ${transport.eng.name}`);
    } catch (e) {
        console.log(e);
    }
};
