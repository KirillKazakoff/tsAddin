import { Worksheet } from 'exceljs';
import { CellObjDoubleT, CellObjT } from '../../../../types/typesUtils';
import { getCellByName, getCellsObj } from './getCellByName';

export const setCellDouble = (ws: Worksheet, setObj: CellObjDoubleT) => {
    const { cell, eng, ru } = setObj;
    const cellObj = getCellsObj(ws, cell);

    cellObj.cellEng.value = eng;
    cellObj.cellRus.value = ru;
};

export const setCell = (ws: Worksheet, setObj: CellObjT) => {
    const { cell, value } = setObj;

    const cellObj = getCellByName(ws, cell);
    cellObj.value = value;
};
