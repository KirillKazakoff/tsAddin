import { Workbook } from 'exceljs';

export const mergeInvoiceKTICells = async (book: Workbook, ranges: number[][]) => {
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
            // mergeTotal({
            //     rows: [rowNumber],
            //     ranges,
            //     ws,
            // });
        }
    });
};
