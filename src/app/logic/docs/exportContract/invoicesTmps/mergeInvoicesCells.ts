import { Workbook } from 'exceljs';
import { mergeCells } from '../../../excel/utils/excelUtilsObj/mergeCells';
import { AgreementT } from '../groupBy/initAgreement';

export const mergeInvoicesCells = async (book: Workbook, agreement: AgreementT) => {
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

                    if (valueStr.includes('consignee')) {
                        if (merge.row.eng) return;
                        merge.row.eng = +cell.row + 2;
                    }
                    if (valueStr.includes('получатель')) {
                        if (merge.row.ru) return;
                        merge.row.ru = +cell.row + 2;
                    }

                    if (valueStr.includes('вид упаковки')) {
                        merge.col.first = +cell.col;
                    }
                    if (valueStr.includes('msc certificate')) {
                        merge.col.second = +cell.col;
                    }
                });
            });

            const { row, col } = merge;
            const { eng, ru } = row;

            if (agreement.record.terms === 'FCA') {
                merge.col.first = 3;
            }

            mergeCells(ws, { row: eng, startCol: 2, endCol: col.first });
            // prettier-ignore
            mergeCells(ws, { row: eng, startCol: col.first + 1, endCol: col.second });

            mergeCells(ws, { row: ru, startCol: 2, endCol: col.first });
            mergeCells(ws, { row: ru, startCol: col.first + 1, endCol: col.second });
        }
    });
};
