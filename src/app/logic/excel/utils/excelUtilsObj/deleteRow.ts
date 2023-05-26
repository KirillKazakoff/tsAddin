import { Worksheet } from 'exceljs';
import { getCellByName } from './getCell';

export const deleteRow = (ws: Worksheet, cellName: string, offsetRow?: number) => {
    const cell = getCellByName(ws, cellName, offsetRow);

    ws.spliceRows(+cell.row, 1);
};
