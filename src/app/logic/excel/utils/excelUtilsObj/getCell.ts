/* eslint-disable no-console */
import { Cell, Worksheet } from 'exceljs';

export const getCellSingle = (ws: Worksheet) => (cellName: string, offsetRow?: number): Cell => {
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
        if (!match) throw new Error();
        return match;
    } catch (e) {
        console.warn(`Не найдена клетка ${cellName}`);
        return null;
    }
};

export const getCellDouble = <T extends string>(ws: Worksheet, offsetCellName: T) => {
    const midCell = getCellSingle(ws)(offsetCellName);
    const distance = +midCell.col - 1;

    return (cellName: string, offsetRow?: number) => {
        try {
            const cellEng = getCellSingle(ws)(cellName, offsetRow);
            const cellRus = ws.getCell(cellEng.row, +cellEng.col + distance);

            return {
                cellEng,
                cellRus,
            };
        } catch (e) {
            return {
                cellEng: null,
                cellRus: null,
            };
        }
    };
};
