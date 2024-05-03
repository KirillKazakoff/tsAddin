import { Worksheet } from 'exceljs';
import { getCellSingle } from './getCell';

export const deleteRow = (ws: Worksheet) => (cellName: string, offsetRow?: number) => {
    const cell = getCellSingle(ws)(cellName, offsetRow);
    ws.spliceRows(+cell.row, 1);
};
