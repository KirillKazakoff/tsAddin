import { Worksheet } from 'exceljs';
import { getCellByName } from './getCellByName';

export const deleteRow = (ws: Worksheet, cellName: string) => {
    const cellRow = getCellByName(ws, cellName).row;
    ws.spliceRows(+cellRow, 1);
};
