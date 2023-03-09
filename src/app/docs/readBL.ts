/* eslint-disable import/no-extraneous-dependencies */
import ExcelJS from 'exceljs';
import _ from 'lodash';

const pathBl = './templates/BL_template.xlsx';

export const read = async () => {
    const blBook = new ExcelJS.Workbook();
    await blBook.xlsx.readFile(pathBl);

    const copy = _.cloneDeep(blBook);
    return copy;
};
