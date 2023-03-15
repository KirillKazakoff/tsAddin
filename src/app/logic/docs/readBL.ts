import ExcelJS from 'exceljs';

const pathBl = './templates/BL.xlsx';

export const read = async () => {
    const file = await (await fetch(pathBl)).arrayBuffer();
    const blBook = new ExcelJS.Workbook();
    await blBook.xlsx.load(file);

    return blBook;
};
