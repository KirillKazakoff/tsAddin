import { Worksheet } from 'exceljs';
import { getCellByName, getCellsObj } from './getCellByName';

// export const getRowDouble = (ws: Worksheet, cellName: string, offset = 0) => {
//     const cell = getCellsObj(ws, cellName);
//     return ws.getRow(+cell.cellEng.row + offset);
// };

export const getRow = (ws: Worksheet, cellName: string, offset = 0) => {
    const cell = getCellByName(ws, cellName);
    return ws.getRow(+cell.row + offset);
};
