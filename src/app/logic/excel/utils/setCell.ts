import ExcelJS from 'exceljs';
import { SetObjT } from '../../../types/typesUtils';
import { getCellsObj } from './getCellByName';

export const setCellDouble = (ws: ExcelJS.Worksheet, setObj: SetObjT) => {
    const { cell, eng, ru } = setObj;
    const cellObj = getCellsObj(ws, cell);

    cellObj.cellEng.value = eng;
    cellObj.cellRus.value = ru;
};
