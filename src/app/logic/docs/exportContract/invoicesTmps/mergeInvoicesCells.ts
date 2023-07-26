import { Workbook } from 'exceljs';
import { AgreementT } from '../groupBy/initAgreement';
import { mergeTotal } from '../../../excel/utils/excelUtilsObj/mergeCells';

export const mergeInvoicesCells = async (book: Workbook, agreement: AgreementT) => {
    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);
    book.worksheets.forEach((ws) => {
        if (ws.name.toLowerCase().includes('invoice')) {
            const merge = {
                rows: { eng: 0, ru: 0 },
                ranges: { first: [2, 0], second: [0, 0] },
            };

            ws.eachRow((row) => {
                row.eachCell((cell) => {
                    if (!cell.value) return;
                    const valueStr = cell.value.toString().toLowerCase();

                    if (valueStr.includes('consignee')) {
                        if (merge.rows.eng) return;
                        merge.rows.eng = +cell.row + 2;
                    }
                    if (valueStr.includes('получатель')) {
                        if (merge.rows.ru) return;
                        merge.rows.ru = +cell.row + 2;
                    }

                    if (valueStr.includes('вид упаковки')) {
                        merge.ranges.first[1] = +cell.col;
                    }
                    if (valueStr.includes('msc certificate')) {
                        merge.ranges.second[1] = +cell.col;
                    }
                });
            });

            merge.ranges.second[0] = merge.ranges.first[1] + 1;

            if (agreement.record.terms === 'FCA') {
                merge.ranges.first[1] = 3;
            }

            mergeTotal({
                rows: Object.values(merge.rows),
                cols: Object.values(merge.ranges),
                ws,
            });
        }
    });
};

// import { Workbook } from 'exceljs';
// import { AgreementT } from '../groupBy/initAgreement';

// export const mergeInvoicesCells = async (book: Workbook, agreement: AgreementT) => {
//     const xls64 = await book.xlsx.writeBuffer();
//     await book.xlsx.load(xls64);
//     book.worksheets.forEach((ws) => {
//         if (ws.name.toLowerCase().includes('invoice')) {
//             const merge = {
//                 rows: { eng: 0, ru: 0 },
//                 cols: { first: 0, second: 0 },
//             };

//             ws.eachRow((row) => {
//                 row.eachCell((cell) => {
//                     if (!cell.value) return;
//                     const valueStr = cell.value.toString().toLowerCase();

//                     if (valueStr.includes('consignee')) {
//                         if (merge.rows.eng) return;
//                         merge.rows.eng = +cell.row + 2;
//                     }
//                     if (valueStr.includes('получатель')) {
//                         if (merge.rows.ru) return;
//                         merge.rows.ru = +cell.row + 2;
//                     }

//                     if (valueStr.includes('вид упаковки')) {
//                         merge.cols.first = +cell.col;
//                     }
//                     if (valueStr.includes('msc certificate')) {
//                         merge.cols.second = +cell.col;
//                     }
//                 });
//             });

//             const { rows, cols } = merge;
//             const { eng, ru } = rows;

//             if (agreement.record.terms === 'FCA') {
//                 merge.cols.first = 3;
//             }

//             const mergeCols = [
//                 [2, cols.first],
//                 [cols.first + 1, cols.second],
//             ];
//             // [eng, ru].forEach((mergeRow) => mergeCols.forEach(([startCol, endCol]) => {
//             //     mergeCells(ws, {
//             //         row: mergeRow,
//             //         startCol,
//             //         endCol,
//             //     });
//             // }));

//             // mergeCells(ws, { row: eng, startCol: 2, endCol: col.first });
//             // // prettier-ignore
//             // mergeCells(ws, { row: eng, startCol: col.first + 1, endCol: col.second });
//             // mergeCells(ws, { row: ru, startCol: 2, endCol: col.first });
//             // mergeCells(ws, { row: ru, startCol: col.first + 1, endCol: col.second });
//         }
//     });
// };
