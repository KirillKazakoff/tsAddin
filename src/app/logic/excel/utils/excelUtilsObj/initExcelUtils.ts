import { Worksheet } from 'exceljs';
import { CellUtilsT, CellUtilsDoubleT } from '../../../../types/typesExcelUtils';
import { getRow } from './getRow';
import { getCellByName, getCellsObj } from './getCellByName';
import { setCell, setCellDouble } from './setCell';
import { deleteRow } from './deleteRow';

export const initExcelUtilsDouble = (ws: Worksheet) => {
    return {
        getRow: getRow.bind(this, ws),
        deleteRow: deleteRow.bind(this, ws),
        getCell: getCellsObj.bind(this, ws),
        setCell: setCellDouble.bind(this, ws),
    } as CellUtilsDoubleT;
};

export const initExcelUtils = (ws: Worksheet) => {
    return {
        getRow: getRow.bind(this, ws),
        deleteRow: deleteRow.bind(this, ws),
        getCell: getCellByName.bind(this, ws),
        setCell: setCell.bind(this, ws),
    } as CellUtilsT;
};
