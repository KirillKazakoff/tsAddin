/* eslint-disable import/no-extraneous-dependencies */
import ExcelJS from 'exceljs';
import _ from 'lodash';
import tablesStore from '../../stores/tablesStore/tablesStore';
import { saveFile } from '../excel/create';
import { initBlTemplate } from './init/initBlTemplate';

export const createBL = async (book: ExcelJS.Workbook) => {
    tablesStore.export.forEach(async (row) => {
        const newBook = _.cloneDeep(book);
        initBlTemplate(newBook, row);

        await saveFile(newBook, row.blNo);
    });
};
