/* eslint-disable no-console */
import { Cell, Worksheet } from 'exceljs';

export const getCell = (ws: Worksheet) => (cellName: string, offsetRow?: number): Cell => {
    let match: Cell;

    try {
        ws.eachRow((row) => row.eachCell((cell) => {
            if (cell.name === cellName) {
                match = cell;
            }
        }));

        if (offsetRow) {
            const cellMatched = match as Cell;
            return ws.getCell(cellMatched.row + offsetRow, cellMatched.col);
        }
        return match;
    } catch (e) {
        console.error(`ошибка в клетке ${cellName}`);
        return null;
    }
};

// eslint-disable-next-line max-len
export const getCellDouble = <T extends number>(ws: Worksheet, offsetCol: T) => (cellName: string, offsetRow?: number) => {
    const cellEng = getCell(ws)(cellName, offsetRow);
    const cellRus = ws.getCell(cellEng.row, +cellEng.col + offsetCol);

    return {
        cellEng,
        cellRus,
    };
};
