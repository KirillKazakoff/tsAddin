/* eslint-disable no-console */
import { Cell, Worksheet } from 'exceljs';
import { CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCell, getCellDouble } from './getCell';
import { getRow } from './getRow';

const setEmptyFn = (ws: Worksheet, cell: Cell) => {
    const mainCell = ws.getCell(+cell.row, +cell.col);
    const titleCell = ws.getCell(+cell.row - 1, +cell.col);
    mainCell.value = '';
    titleCell.value = '';
};

export const setCellDouble = (ws: Worksheet, offsetCell: string) => (setObj: CellObjDoubleT) => {
    const {
        cell, eng, ru, offsetRow, isEmpty, isEmptyCell, height,
    } = setObj;
    try {
        const cellObj = getCellDouble(ws, offsetCell)(cell, offsetRow);
        cellObj.cellEng.value = eng;
        cellObj.cellRus.value = ru;

        if (height) {
            const row = getRow(ws)(cell);
            console.log(row);
            row.height = height;
        }

        if (isEmptyCell) {
            cellObj.cellEng.value = '';
            cellObj.cellRus.value = '';
            return cellObj;
        }
        if (isEmpty) {
            setEmptyFn(ws, cellObj.cellEng);
            setEmptyFn(ws, cellObj.cellRus);
        }
        return cellObj;
    } catch (e) {
        if (isEmpty) return null;
        console.error(`Ошибка при установке значения ${cell}`);
        return null;
    }
};

export const setCell = (ws: Worksheet) => (setObj: CellObjT) => {
    const {
        cell, value, offsetRow, numFmt, isEmpty, height, isEmptyCell,
    } = setObj;
    try {
        const cellObj = getCell(ws)(cell, offsetRow);
        if (isEmptyCell) {
            cellObj.value = '';
            return cellObj;
        }

        if (value) {
            cellObj.value = value;
        }

        if (numFmt) cellObj.numFmt = numFmt;
        if (height) {
            const row = getRow(ws)(cell);
            row.height = height;
        }
        if (isEmpty) {
            setEmptyFn(ws, cellObj);
        }
        return cellObj;
    } catch (e) {
        console.error(`Ошибка при установке значения ${cell}`);
        return null;
    }
};
