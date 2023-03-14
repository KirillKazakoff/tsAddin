/* eslint-disable import/no-extraneous-dependencies */
import ExcelJS from 'exceljs';
import _ from 'lodash';
import { initBlTemplate } from './init/initBlTemplate';
import tablesStore from '../stores/tablesStore/tablesStore';
import { saveFile } from '../utils/create';

export const createBL = async (book: ExcelJS.Workbook) => {
    try {
        tablesStore.export.forEach(async (row) => {
            console.log(row);
            const newBook = _.cloneDeep(book);
            initBlTemplate(newBook, row);

            console.log(row.blNo);
            await saveFile(newBook, row.blNo);
        });
    } catch (e) {
        console.log(e);
    }
};
