import { Worksheet } from 'exceljs';
import { CellObjDoubleT, CellObjT } from '../../../../types/typesExcelUtils';
import { getCellByName, getCellsObj } from './getCell';

export const setCellDouble = (
    ws: Worksheet,
    offset: number,
    setObj: CellObjDoubleT,
) => {
    const { cell, eng, ru } = setObj;
    const cellObj = getCellsObj(ws, offset, cell);

    cellObj.cellEng.value = eng;
    cellObj.cellRus.value = ru;
    return cellObj;
};

export const setCell = (ws: Worksheet, setObj: CellObjT) => {
    const { cell, value } = setObj;

    const cellObj = getCellByName(ws, cell);
    cellObj.value = value;
    return cellObj;
};
