import { Workbook, Worksheet } from 'exceljs';
import { AgreementT } from '../groupBy/initAgreement';
import { mergeTotal } from '../../../excel/utils/excelUtilsObj/mergeCells';

export const mergeExportInvoices = async (book: Workbook, agreement: AgreementT) => {
    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);
    book.worksheets.forEach((ws) => {
        if (ws.name.toLowerCase().includes('invoice')) {
            const merge = {
                rows: {
                    buyer: { eng: 0, ru: 0 },
                    consignee: { eng: 0, ru: 0 },
                },
                ranges: { first: [2, 0], second: [0, 0] },
            };

            ws.eachRow((row) => {
                row.eachCell((cell) => {
                    if (!cell.value) return;
                    const valueStr = cell.value.toString().toLowerCase();

                    if (valueStr.includes('consignee')) {
                        if (merge.rows.consignee.eng) return;
                        merge.rows.consignee.eng = +cell.row + 2;
                    }
                    if (valueStr.includes('получатель')) {
                        if (merge.rows.consignee.ru) return;
                        merge.rows.consignee.ru = +cell.row + 2;
                    }
                    if (valueStr.includes('country of origing')) {
                        merge.ranges.first[1] = +cell.col;
                    }
                    if (valueStr.includes('страна изготовитель')) {
                        merge.ranges.second[1] = +cell.col;
                    }

                    if (
                        agreement.record.terms === 'EXW'
                        && agreement.record.type === 'export'
                    ) {
                        //
                    }
                });
            });

            if (agreement.record.terms === 'FCA') {
                merge.ranges.first[1] = 3;
            }

            merge.ranges.second[0] = merge.ranges.first[1] + 1;

            mergeTotal({
                rows: Object.values(merge.rows),
                ranges: Object.values(merge.ranges),
                ws,
            });
        }
    });
};

export const mergeCoppied = (ws: Worksheet, agreement: AgreementT) => {
    const merge = {
        consigneeEng: { row: { start: 0, end: 0 }, col: { start: 0, end: 0 } },
        consigneeRu: { row: { start: 0, end: 0 }, col: { start: 0, end: 0 } },
        buyerEng: { row: { start: 0, end: 0 }, col: { start: 0, end: 0 } },
        buyerRu: { row: { start: 0, end: 0 }, col: { start: 0, end: 0 } },
    };

    if (!ws.name.includes('invoice')) return;

    ws.eachRow((row) => {
        row.eachCell((cell) => {
            if (!cell.value) return;
            const valueStr = cell.value.toString().toLowerCase();

            const mergeSettings = {
                consignee: () => {
                    merge.consigneeEng.row.start = +cell.row + 2;
                },
                получатель: () => {
                    merge.consigneeRu.row.start = +cell.row + 2;
                },
                buyer: () => {
                    merge.buyerEng.row.start = +cell.row + 2;
                },
                покупатель: () => {
                    merge.buyerRu.row.start = +cell.row + 2;
                },
            };

            if (valueStr.includes('consignee:')) {
                merge.consigneeEng.row.start = +cell.row + 2;
            }
            if (valueStr.includes('получатель:')) {
                merge.consigneeRu.row.start = +cell.row + 2;
            }
            if (valueStr.includes('buyer:')) {
                merge.buyerEng.row.start = +cell.row + 2;
            }
            if (valueStr.includes('получатель:')) {
                merge.buyerRu.row.start = +cell.row + 2;
            }

            if (valueStr.includes('country of origing')) {
                merge.buyerEng.col.end = +cell.col;
                merge.consigneeEng.col.end = +cell.col;
            }
            if (valueStr.includes('страна изготовитель')) {
                merge.buyerRu.col.end = +cell.col;
            }

            // if (
            //     agreement.record.terms === 'EXW'
            //     && agreement.record.type === 'export'
            // ) {
            //     //
            // }
        });
    });
};
