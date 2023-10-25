import { Cell, Workbook } from 'exceljs';
import { mergeCells } from '../../../excel/utils/excelUtilsObj/mergeCells';
import { InvoiceT } from '../groupBy/initInvoice';
import { initExportInvoiceRows } from './initExportInvoiceRows';

export const mergeCoppiedInvoice = async (book: Workbook, invoice: InvoiceT) => {
    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);
    const ws = book.getWorksheet(`invoice ${invoice.invoiceNo}`);

    const initMerge = () => ({ col: { start: 0, end: 0 }, row: { start: 0, end: 0 } });
    const distance = 5;
    const arrayCl = { row: 0, col: 0 };

    const caseCellName = {
        setMergeAddresses: [
            'contractor:',
            'исполнитель:',
            'consignee:',
            'получатель:',
            'buyer:',
            'покупатель:',
        ],
        setMergeColumns: [
            'fishing vessel:',
            'msc:',
            'transport vessel:',
            'to:',
            'from:',
            'terms of delivery and payment:',
            'судно изготовитель',
            'транспортное судно:',
            'порт назначения:',
            'порт отправления:',
            'условия доставки и оплаты:',
        ],
        setNonComPrice: ['данная цена указана', 'this price given'],
        setBlNo: ['bl no'],
    };

    const mergeArray = [];

    const getFunctions = (cell: Cell) => {
        const merge = initMerge();

        return {
            setMergeAddresses: () => {
                merge.row.start = +cell.row + 2;
                merge.row.end = +cell.row + 2;
                merge.col.start = +cell.col;
                merge.col.end = +cell.col + distance;

                mergeArray.push(merge);
            },
            setNonComPrice: () => {
                merge.row.start = +cell.row;
                merge.row.end = +cell.row + 1;
                merge.col.start = +cell.col;
                merge.col.end = +cell.col + 3;

                mergeArray.push(merge);
            },
            setMergeColumns: () => {
                merge.col.start = +cell.col;
                merge.col.end = +cell.col + 1;
                merge.row.start = +cell.row + 1;
                merge.row.end = +cell.row + 1;

                mergeArray.push(merge);
            },

            setBlNo: () => {
                arrayCl.row = +cell.row + 1;
                arrayCl.col = +cell.col;
            },
        };
    };

    ws.eachRow((row) => {
        row.eachCell((cell) => {
            if (!cell.value) return;

            const valueStr = cell.value.toString().toLowerCase();
            const functions = getFunctions(cell);

            Object.entries(caseCellName).forEach(([key, array]) => {
                array.forEach((caseValue) => {
                    if (valueStr.includes(caseValue)) {
                        functions[key]();
                    }
                });
            });
        });
    });

    mergeArray.forEach((cell) => {
        mergeCells(ws, {
            row: cell.row.start,
            endRow: cell.row.end,
            startCol: cell.col.start,
            endCol: cell.col.end,
        });
    });

    initExportInvoiceRows(ws, invoice, arrayCl);
};
