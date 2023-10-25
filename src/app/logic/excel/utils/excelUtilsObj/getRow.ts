import { Worksheet } from 'exceljs';
import { getCellByName } from './getCell';

export const getRow = (ws: Worksheet) => (cellName: string, offset = 0) => {
    const cell = getCellByName(ws, cellName);
    return ws.getRow(+cell.row + offset);
};
