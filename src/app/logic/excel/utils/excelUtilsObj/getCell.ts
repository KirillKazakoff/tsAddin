/* eslint-disable no-console */
import ExcelJS, { Cell, Worksheet } from 'exceljs';

export const getCellByName = (
    worksheet: Worksheet,
    cellName: string,
    offsetRow?: number,
): Cell => {
    let match: ExcelJS.Cell;

    try {
        worksheet.eachRow((row) => row.eachCell((cell) => {
            if (cell.name === cellName) {
                match = cell;
            }
        }));

        if (offsetRow) {
            const cellMatched = match as Cell;
            return worksheet.getCell(cellMatched.row + offsetRow, cellMatched.col);
        }
        return match;
    } catch (e) {
        console.error(`ошибка в клетке ${cellName}`);
        return null;
    }
};

export const getCellsObj = (
    ws: ExcelJS.Worksheet,
    offsetCol: number,
    cellName: string,
    offsetRow?: number,
) => {
    try {
        const cellEng = getCellByName(ws, cellName, offsetRow);
        const cellRus = ws.getCell(cellEng.row, +cellEng.col + offsetCol);

        return {
            cellEng,
            cellRus,
        };
    } catch (e) {
        console.error(`ошибка в клетке ${cellName}`);
        return null;
    }
};
