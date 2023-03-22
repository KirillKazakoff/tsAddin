import ExcelJS from 'exceljs';

export const readTmp = async (path: string) => {
    const file = await (await fetch(path)).arrayBuffer();
    const book = new ExcelJS.Workbook();
    await book.xlsx.load(file);

    return book;
};
