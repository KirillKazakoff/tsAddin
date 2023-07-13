import ExcelJS from 'exceljs';

export const createDischargeInvoice = () => {
    const book = new ExcelJS.Workbook();
    const ws = book.addWorksheet('invoice');
};
