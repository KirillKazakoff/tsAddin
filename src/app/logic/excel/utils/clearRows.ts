import { Worksheet } from 'exceljs';
import { getCellByName as getCell } from './excelUtilsObj/getCell';

export const clearRows = (
    wsOriginal: Worksheet,
    wsCopy: Worksheet,
    length: number,
    cellName: string,
) => {
    const rowCount = +getCell(wsOriginal, cellName).row;
    const startDeleteArray = rowCount - length;

    wsOriginal.spliceRows(startDeleteArray, length);
    wsCopy.spliceRows(rowCount, 1);
};
