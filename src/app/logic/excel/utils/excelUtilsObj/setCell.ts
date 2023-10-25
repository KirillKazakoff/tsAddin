/* eslint-disable no-console */
import { Worksheet } from 'exceljs';
import { CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCellByName, getCellsObj } from './getCell';

export const setCellDouble = (
    ws: Worksheet,
    offsetCol: number,
    setObj: CellObjDoubleT,
) => {
    const {
        cell, eng, ru, offsetRow,
    } = setObj;
    const cellObj = getCellsObj(ws, offsetCol, cell, offsetRow);

    cellObj.cellEng.value = eng;
    cellObj.cellRus.value = ru;
    return cellObj;
};

export const setCell = (ws: Worksheet, setObj: CellObjT) => {
    const {
        cell, value, offsetRow, numFmt,
    } = setObj;
    try {
        const cellObj = getCellByName(ws, cell, offsetRow);
        cellObj.value = value;

        if (numFmt) cellObj.numFmt = numFmt;
        return cellObj;
    } catch (e) {
        console.error(e);
        return null;
    }
};
