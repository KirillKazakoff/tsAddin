/* eslint-disable import/no-extraneous-dependencies */
import ExcelJS from 'exceljs';
import _ from 'lodash';
import { initBlTemplate } from './init/initBlTemplate';
import tablesStore from '../stores/tablesStore/tablesStore';
import { saveFile } from '../utils/create';

export const createBL = async (book: ExcelJS.Workbook) => {
    try {
        tablesStore.export.forEach(async (row) => {
            const newBook = _.cloneDeep(book);
            initBlTemplate(newBook, row);

            await saveFile(newBook, row.blNo);
            console.log('hello');
        });
    } catch (e) {
        console.log(e);
    }
};
