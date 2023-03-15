import ExcelJS from 'exceljs';

type CellT = ExcelJS.Cell;

export const getCellByName = (worksheet: ExcelJS.Worksheet, name: string): CellT => {
    let match;

    worksheet.eachRow((row) => row.eachCell((cell) => {
        if (cell.name === name) {
            match = cell;
        }
    }));
    return match;
};
