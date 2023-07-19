import { Workbook } from 'exceljs';
import { mergeCells } from '../../excel/utils/excelUtilsObj/mergeCells';

export const mergeDischargeInvoiceCells = async (book: Workbook) => {
    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);

    book.worksheets.forEach((ws) => {
        if (ws.name.toLocaleLowerCase().includes('invoice')) {
            let rowNumber;

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

            const cols = {
                first: 2,
                second: 6,
                third: 7,
                fourth: 8,
                fifth: 9,
                sixth: 10,
            };

            mergeCells(ws, {
                row: rowNumber,
                startCol: cols.first,
                endCol: cols.second,
            });
            mergeCells(ws, {
                row: rowNumber,
                startCol: cols.third,
                endCol: cols.fourth,
            });
            mergeCells(ws, {
                row: rowNumber,
                startCol: cols.fifth,
                endCol: cols.sixth,
            });
        }
    });
};
