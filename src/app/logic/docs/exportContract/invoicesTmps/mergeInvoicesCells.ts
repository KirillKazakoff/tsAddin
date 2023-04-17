import { Workbook, Cell } from 'exceljs';

export const mergeInvoicesCells = async (book: Workbook) => {
    const xls64 = await book.xlsx.writeBuffer();
    await book.xlsx.load(xls64);
    book.worksheets.forEach((ws) => {
        if (ws.name !== 'Export_Contract') {
            let consigneeTitleEngCl: Cell;
            let consigneeTitleRuCl: Cell;

            ws.eachRow((row) => {
                row.eachCell((cell) => {
                    if (!cell.value) return;
                    const valueStr = cell.value.toString();
                    if (valueStr.includes('Consignee')) {
                        consigneeTitleEngCl = cell;
                    }
                    if (valueStr.includes('Получатель')) {
                        consigneeTitleRuCl = cell;
                    }
                });
            });

            const engRow = +consigneeTitleEngCl.row + 2;
            const ruRow = +consigneeTitleRuCl.row + 2;

            ws.unMergeCells(engRow, 1, engRow, 4);
            ws.mergeCells(engRow, 1, engRow, 4);
            ws.unMergeCells(engRow, 5, engRow, 8);
            ws.mergeCells(engRow, 5, engRow, 8);

            ws.unMergeCells(ruRow, 1, ruRow, 4);
            ws.mergeCells(ruRow, 1, ruRow, 4);
            ws.unMergeCells(ruRow, 5, ruRow, 8);
            ws.mergeCells(ruRow, 5, ruRow, 8);
        }
    });
};
