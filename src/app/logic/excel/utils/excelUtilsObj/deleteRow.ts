import { Worksheet } from 'exceljs';
import { getCell } from './getCell';

export const deleteRow = (ws: Worksheet) => (cellName: string, offsetRow?: number) => {
    const cell = getCell(ws)(cellName, offsetRow);
    ws.spliceRows(+cell.row, 1);
};
