import { Worksheet } from 'exceljs';
import { CellUtilsT, CellUtilsDoubleT } from '../../../../types/typesExcelUtils';
import { getRow } from './getRow';
import { getCellByName, getCellsObj } from './getCell';
import { setCell, setCellDouble } from './setCell';
import { deleteRow } from './deleteRow';
import { mergeCells } from './mergeCells';

export const initExcelUtilsDouble = (ws: Worksheet, offset: number) => {
    return {
        ws,
        getRow: getRow.bind(this, ws),
        deleteRow: deleteRow.bind(this, ws),
        mergeCells: mergeCells.bind(this, ws),
        getCell: getCellsObj.bind(this, ws, offset),
        setCell: setCellDouble.bind(this, ws, offset),
    } as CellUtilsDoubleT;
};

export const initExcelUtils = (ws: Worksheet) => {
    return {
        ws,
        getRow: getRow.bind(this, ws),
        deleteRow: deleteRow.bind(this, ws),
        mergeCells: mergeCells.bind(this, ws),
        getCell: getCellByName.bind(this, ws),
        setCell: setCell.bind(this, ws),
    } as CellUtilsT;
};
