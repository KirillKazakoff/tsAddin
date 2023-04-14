import ExcelJS, { Cell } from 'exceljs';

export const getCellByName = (worksheet: ExcelJS.Worksheet, name: string): Cell => {
    let match;

    worksheet.eachRow((row) => row.eachCell((cell) => {
        if (cell.name === name) {
            match = cell;
        }
    }));
    return match;
};

export const getCellsObj = (ws: ExcelJS.Worksheet, cellName: string) => {
    const cellEng = getCellByName(ws, cellName);
    const cellRus = ws.getCell(cellEng.row, +cellEng.col + 1);
    return {
        cellEng,
        cellRus,
    };
};
