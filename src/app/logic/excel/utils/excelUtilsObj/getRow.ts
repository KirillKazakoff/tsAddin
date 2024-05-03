import { Worksheet } from 'exceljs';
import { getCellSingle } from './getCell';

export const getRow = (ws: Worksheet) => (cellName: string, offset = 0) => {
    const cell = getCellSingle(ws)(cellName);

    return ws.getRow(+cell.row + offset);
};
