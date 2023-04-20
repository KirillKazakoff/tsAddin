import { Workbook } from 'exceljs';
import { mergeCells } from '../../../excel/utils/excelUtilsObj/mergeCells';

export const mergeInvoicesCells = async (book: Workbook) => {
    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);
    book.worksheets.forEach((ws) => {
        if (ws.name.toLowerCase().includes('invoice')) {
            const merge = {
                row: { eng: 0, ru: 0 },
                col: { first: 0, second: 0 },
            };

            ws.eachRow((row) => {
                row.eachCell((cell) => {
                    if (!cell.value) return;
                    const valueStr = cell.value.toString().toLowerCase();

                    const { row: mergeRow, col } = merge;
                    if (valueStr.includes('consignee')) {
                        if (mergeRow.eng) return;
                        mergeRow.eng = +cell.row + 2;
                    }
                    if (valueStr.includes('получатель')) {
                        if (mergeRow.ru) return;
                        mergeRow.ru = +cell.row + 2;
                    }

                    if (valueStr.includes('вид упаковки')) {
                        col.first = +cell.col;
                    }
                    if (valueStr.includes('msc certificate')) {
                        col.second = +cell.col;
                    }
                });
            });

            const { row, col } = merge;
            const { eng, ru } = row;

            mergeCells(ws, { row: eng, startCol: 2, endCol: col.first });
            // prettier-ignore
            mergeCells(ws, { row: eng, startCol: col.first + 1, endCol: col.second });

            mergeCells(ws, { row: ru, startCol: 2, endCol: col.first });
            mergeCells(ws, { row: ru, startCol: col.first + 1, endCol: col.second });
        }
    });
};
