/* eslint-disable no-console */
import { Cell, Worksheet } from 'exceljs';
import { CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCell, getCellDouble } from './getCell';

const emptyTitleFn = (ws: Worksheet, cell: Cell) => {
    const titleCell = ws.getCell(+cell.row - 1, +cell.col);
    titleCell.value = '';
};

export const setCellDouble = (ws: Worksheet, offsetCell: string) => (setObj: CellObjDoubleT) => {
    const {
        cell, eng, ru, offsetRow, isEmptyTitle,
    } = setObj;
    const cellObj = getCellDouble(ws, offsetCell)(cell, offsetRow);

    if (isEmptyTitle) {
        emptyTitleFn(ws, cellObj.cellEng);
        emptyTitleFn(ws, cellObj.cellRus);
    }

    cellObj.cellEng.value = eng;
    cellObj.cellRus.value = ru;
    return cellObj;
};

export const setCell = (ws: Worksheet) => (setObj: CellObjT) => {
    const {
        cell, value, offsetRow, numFmt, isEmptyTitle,
    } = setObj;
    try {
        const cellObj = getCell(ws)(cell, offsetRow);
        cellObj.value = value;

        if (numFmt) cellObj.numFmt = numFmt;
        if (isEmptyTitle) emptyTitleFn(ws, cellObj);
        return cellObj;
    } catch (e) {
        console.error(e);
        return null;
    }
};
