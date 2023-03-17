import ExcelJS from 'exceljs';

export const readTmpBl = async (path: string) => {
    const file = await (await fetch(path)).arrayBuffer();
    const blBook = new ExcelJS.Workbook();
    await blBook.xlsx.load(file);

    return blBook;
};
