import { Worksheet } from 'exceljs';
import { getCell } from './getCell';

export const getRow = (ws: Worksheet) => (cellName: string, offset = 0) => {
    const cell = getCell(ws)(cellName);

    return ws.getRow(+cell.row + offset);
};
