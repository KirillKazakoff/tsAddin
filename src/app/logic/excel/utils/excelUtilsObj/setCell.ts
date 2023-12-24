/* eslint-disable no-console */
import { Cell, Worksheet } from 'exceljs';
import { CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCell, getCellDouble } from './getCell';

const setEmptyFn = (ws: Worksheet, cell: Cell) => {
    const mainCell = ws.getCell(+cell.row, +cell.col);
    console.log(mainCell.value);
    const titleCell = ws.getCell(+cell.row - 1, +cell.col);
    mainCell.value = '';
    titleCell.value = '';
};

export const setCellDouble = (ws: Worksheet, offsetCell: string) => (setObj: CellObjDoubleT) => {
    const {
        cell, eng, ru, offsetRow, isEmpty,
    } = setObj;
    try {
        const cellObj = getCellDouble(ws, offsetCell)(cell, offsetRow);
        cellObj.cellEng.value = eng;
        cellObj.cellRus.value = ru;

        if (isEmpty) {
            console.log(cell);
            setEmptyFn(ws, cellObj.cellEng);
            setEmptyFn(ws, cellObj.cellRus);
        }
        return cellObj;
    } catch (e) {
        console.error(`Ошибка при установке значения ${cell}`);
        return null;
    }
};

export const setCell = (ws: Worksheet) => (setObj: CellObjT) => {
    const {
        cell, value, offsetRow, numFmt, isEmpty,
    } = setObj;
    try {
        const cellObj = getCell(ws)(cell, offsetRow);
        cellObj.value = value;

        cellObj.style.alignment.indent = 2;

        if (numFmt) cellObj.numFmt = numFmt;
        if (isEmpty) {
            setEmptyFn(ws, cellObj);
        }
        return cellObj;
    } catch (e) {
        console.error(`Ошибка при установке значения ${cell}`);
        return null;
    }
};
