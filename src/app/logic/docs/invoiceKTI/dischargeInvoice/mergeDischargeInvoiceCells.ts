import { Workbook } from 'exceljs';
import { mergeTotal } from '../../../excel/utils/excelUtilsObj/mergeCells';

export const mergeDischargeInvoiceCells = async (book: Workbook) => {
    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);

    book.worksheets.forEach((ws) => {
        if (ws.name.toLocaleLowerCase().includes('invoice')) {
            let rowNumber: number;

            ws.eachRow((row) => {
                row.eachCell((cell) => {
                    if (!cell.value) return;
                    const valueStr = cell.value.toString().toLowerCase();

                    if (valueStr.includes('описание')) {
                        if (rowNumber) return;
                        rowNumber = +cell.row;
                    }
                });
            });

            // prettier-ignore
            const ranges = [[2, 6], [7, 8], [9, 10]];
            mergeTotal({
                rows: [rowNumber],
                ranges,
                ws,
            });
        }
    });
};
