/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */

import _ from 'lodash';
import ExcelJS from 'exceljs';

const pathBl = './templates/BL_template.xlsx';

export const read = async () => {
    const file = await (await fetch(pathBl)).arrayBuffer();
    const blBook = new ExcelJS.Workbook();
    await blBook.xlsx.load(file);

    return blBook;
};
